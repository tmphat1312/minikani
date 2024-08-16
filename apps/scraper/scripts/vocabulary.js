import { fromURL } from 'cheerio';

import { customMapping, multipleHTML, multipleTexts } from '../utils.js';

export async function scrapeVocabulary(slug) {
  let $ = await fromURL(`https://www.wanikani.com/vocabulary/${slug}`);

  const multipleTexts$ = multipleTexts($);
  const multipleHTML$ = multipleHTML($);
  const customMapping$ = customMapping($);

  let meaning$ = $('#section-meaning');
  let reading$ = $('#section-reading');
  let context$ = $('#section-context');

  let [primary_meaning, alternative_meanings, word_type] = multipleTexts$(
    meaning$,
  )(`.subject-section__meanings-items`);

  // Eh!, this is so imperative, I don't like it
  if (word_type == null) {
    [word_type, alternative_meanings] = [alternative_meanings, null];
  }

  return {
    level: $(`a[class$="icon--level"]`).text(),
    character: $(`[class$="icon--vocabulary"]`).text(),
    primary_meaning,
    alternative_meanings,
    word_type,
    meaning_explanation: multipleHTML$(meaning$)(`.subject-section__text`),
    reading_explanation: multipleHTML$(reading$)(`.subject-section__text`),
    readingWitAudios: customMapping$(reading$)('.reading-with-audio')(
      (el$) => ({
        reading: el$.find(`[lang="ja"]`).text(),
        audios: customMapping$(el$)('li')((li$) => ({
          sources: customMapping$(li$)('source')((source$) =>
            source$.attr('src'),
          ),
          actor_name: li$.find('.reading-with-audio__voice-actor-name').text(),
        })),
      }),
    ),
    context_sentences: customMapping$(context$)('.subject-section__text')(
      (el$) => {
        let [jp_sentence, en_sentence] = multipleTexts$(el$)('p');
        return { jp_sentence, en_sentence };
      },
    ),
    patterns_of_use: multipleTexts$(context$)(
      `.subject-collocations__pattern-name`,
    ),
    common_word_combinations: customMapping$(context$)('.context-sentences')(
      (el$) => {
        let [jp_sentence, en_sentence] = multipleTexts$(el$)('p');
        return { jp_sentence, en_sentence };
      },
    ),
  };
}
