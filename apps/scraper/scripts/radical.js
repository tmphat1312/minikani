import { fromURL } from 'cheerio';

scrapeRadical('ground').then(console.log);

export async function scrapeRadical(slug) {
  let $ = await fromURL(`https://www.wanikani.com/radicals/${slug}`);
  return {
    radical: $.extract({
      level: {
        selector: `[class$="icon--level"]`,
        value: (el) => Number($(el).text()),
      },
      character: `[class$="icon--radical"]`,
      primary_meaning: `[class$="__meanings-items"]:eq(0)`,
      alternative_meanings: `[class$="__meanings-items"]:eq(1)`,
      mnemonic: [
        {
          selector: '.subject-section__text',
          value: (el) => $(el).html(),
        },
      ],
    }),
    found_in_kanjis: $.extract({
      radical_name: `[class$="icon--radical"]`,
      found_in_kanjis: ['.subject-character__characters'],
    }),
  };
}
