import { fromURL } from 'cheerio';

scrapeLevels().then(console.log);

export async function scrapeLevels() {
  let $ = await fromURL(`https://www.wanikani.com/kanji`);
  return $.extract({
    levels: [
      {
        selector: `.sitemap__group-header`,
        value: (el) => {
          let [jp_name, en_name] = $(el).text().split(' ');
          return {
            jp_name,
            en_name,
            min_value: $(el).next().find('a').first().text(),
            max_value: $(el).next().find('a').last().text(),
          };
        },
      },
    ],
  }).levels;
}
