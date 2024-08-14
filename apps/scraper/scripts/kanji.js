import { fromURL } from 'cheerio';
import { multipleTexts, multipleHTML } from '../utils.js';

export async function scrapeKanji(slug) {
  let $ = await fromURL(`https://www.wanikani.com/kanji/${slug}`);

  const multipleTexts$ = multipleTexts($);
  const multipleHTML$ = multipleHTML($);

  let meaning$ = $('#section-meaning');
  let reading$ = $('#section-reading');
  let similar$ = $('#section-similar-subjects');
  let amalgamations$ = $('#section-amalgamations');

  let [primary_meaning, alternative_meanings] = multipleTexts$(meaning$)(
    `[class$="__meanings-items"]`,
  );
  let [onyomi_reading, kunyomi_reading, nanori_reading] = multipleTexts$(
    reading$,
  )(`.subject-readings__reading-items`);

  return {
    level: $(`a[class$="icon--level"]`).text(),
    character: $(`[class$="icon--kanji"]`).text(),
    primary_meaning,
    alternative_meanings,
    meaning_hints: multipleHTML$(meaning$)(`.subject-hint__text`),
    meaning_mnemonic: multipleHTML$(meaning$)(`.subject-section__text`),
    onyomi_reading,
    kunyomi_reading,
    nanori_reading,
    reading_hints: multipleHTML$(reading$)(`.subject-hint__text`),
    reading_mnemonic: multipleHTML$(reading$)(`.subject-section__text`),
    visually_similar_kanji: multipleTexts$(similar$)(
      '.subject-character__meaning',
    ),
    found_in_vocabulary: multipleTexts$(amalgamations$)(
      '.subject-character__characters',
    ),
  };
}
