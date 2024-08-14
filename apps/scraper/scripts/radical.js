import { fromURL } from 'cheerio';
import { multipleTexts, multipleHTML } from '../utils.js';

export async function scrapeRadical(slug) {
  let $ = await fromURL(`https://www.wanikani.com/radicals/${slug}`);

  const multipleTexts$ = multipleTexts($);
  const multipleHTML$ = multipleHTML($);

  let meaning$ = $('#section-meaning');
  let amalgamations$ = $('#section-amalgamations');

  let [primary_meaning, alternative_meanings] = multipleTexts$(meaning$)(
    `[class$="__meanings-items"]`,
  );

  return {
    level: $(`a[class$="icon--level"]`).text(),
    character: $(`[class$="icon--radical"]`).text(),
    primary_meaning,
    alternative_meanings,
    mnemonic: multipleHTML$(meaning$)(`.subject-section__text`),
    foundInKanji: multipleTexts$(amalgamations$)(
      `.subject-character__characters`,
    ),
  };
}
