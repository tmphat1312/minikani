import { fromURL } from 'cheerio';

scrapeKanji('大').then(console.log);

export async function scrapeKanji(slug) {
  let $ = await fromURL(`https://www.wanikani.com/kanji/${slug}`);
  return {
    kanji: $.extract({
      level: {
        selector: `[class$="icon--level"]`,
        value: (el) => Number($(el).text()),
      },
      character: `[class$="icon--kanji"]`,
      primary_meaning: `[class$="__meanings-items"]:eq(0)`,
      alternative_meanings: `[class$="__meanings-items"]:eq(1)`,
      meaning_hints: [
        {
          selector: `#section-meaning .subject-hint__text`,
          value: (el) => $(el).html(),
        },
      ],
      meaning_mnemonic: [
        {
          selector: `#section-meaning .subject-section__text`,
          value: (el) => $(el).html(),
        },
      ],
      onyomi_reading: {
        selector: `.subject-readings__reading-items:eq(0)`,
        value: (el) => $(el).text().trim(),
      },
      kunyomi_reading: {
        selector: `.subject-readings__reading-items:eq(1)`,
        value: (el) => $(el).text().trim(),
      },
      nanori_reading: {
        selector: `.subject-readings__reading-items:eq(2)`,
        value: (el) => $(el).text().trim(),
      },
      reading_hints: [
        {
          selector: `#section-reading .subject-hint__text`,
          value: (el) => $(el).html(),
        },
      ],
      reading_mnemonic: [
        {
          selector: `#section-reading .subject-section__text`,
          value: (el) => $(el).html(),
        },
      ],
    }),
    visually_similar_kanji: $.extract({
      kanji: `[class$="icon--kanji"]`,
      similar_kanjis: [
        '#section-similar-subjects .subject-character__characters',
      ],
    }),
    found_in_vocabulary: $.extract({
      kanji: `[class$="icon--kanji"]`,
      vocabulary: ['#section-amalgamations .subject-character__characters'],
    }),
  };
}
