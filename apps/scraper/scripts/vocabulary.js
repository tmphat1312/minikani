import { fromURL } from 'cheerio';

scrapeVocabulary('大人').then((data) => console.log(data.context_sentences));

export async function scrapeVocabulary(slug) {
  let $ = await fromURL(`https://www.wanikani.com/vocabulary/${slug}`);
  return {
    vocabulary: $.extract({
      level: {
        selector: `[class$="icon--level"]`,
        value: (el) => Number($(el).text()),
      },
      character: `[class$="icon--vocabulary"]`,
      primary_meaning: `.subject-section__meanings-items:first`,
      alternative_meanings: {
        selector: `.subject-section__meanings:eq(1)`,
        value: (el) => {
          let title = $(el).find('.subject-section__meanings-title').text();
          let item = $(el).find('.subject-section__meanings-items').text();
          return title.includes('Alternative') ? item : undefined;
        },
      },
      word_types: {
        selector: `.subject-section__meanings:last`,
        value: (el) => {
          let title = $(el).find('.subject-section__meanings-title').text();
          let item = $(el).find('.subject-section__meanings-items').text();
          return title.includes('Word') ? item : undefined;
        },
      },
      meaning_explanation: [
        {
          selector: `#section-meaning .subject-section__text`,
          value: (el) => $(el).html(),
        },
      ],
      reading_explanation: [
        {
          selector: `#section-reading .subject-section__text`,
          value: (el) => $(el).html(),
        },
      ],
    }),
    vocabulary_readings: $.extract({
      character: `[class$="icon--vocabulary"]`,
      reading_with_audios: [
        {
          selector: `.reading-with-audio`,
          value: (el) => {
            return $(el).extract({
              reading: `[lang="ja"]`,
              audios: [
                {
                  selector: `li`,
                  value: {
                    sources: {
                      selector: `source`,
                      value: (el) => $(el).attr('src'),
                    },
                    actor_name: `.reading-with-audio__voice-actor-name`,
                  },
                },
              ],
            });
          },
        },
      ],
    }),
    context_sentences: $.extract({
      character: `[class$="icon--vocabulary"]`,
      sentences: [
        {
          selector: `#section-context .subject-section__text`,
          value: (el) => {
            return $(el).extract({
              jp_sentence: `p:first`,
              en_sentence: `p:last`,
            });
          },
        },
      ],
    }),
    patterns_of_use_context: $.extract({
      character: `[class$="icon--vocabulary"]`,
      patterns_of_use: [`.subject-collocations__pattern-name`],
      common_word_combinations: [
        {
          selector: `.context-sentences`,
          value: (el) => {
            return $(el).extract({
              jp_sentence: `p:first`,
              en_sentence: `p:last`,
            });
          },
        },
      ],
    }),
  };
}
