import { fromURL } from 'cheerio';
import { JSONFilePreset } from 'lowdb/node';
import ora from 'ora';

import {
  scrapeKanji,
  scrapeRadical,
  scrapeVocabulary,
} from './scripts/index.js';
import { wait } from './utils.js';

const defaultData = {
  levels: [
    {
      minValue: 1,
      maxValue: 10,
      enName: 'Pleasant',
      jpName: '快',
    },
    {
      minValue: 11,
      maxValue: 20,
      enName: 'Painful',
      jpName: '苦',
    },
    {
      minValue: 21,
      maxValue: 30,
      enName: 'Dead',
      jpName: '死',
    },
    {
      minValue: 31,
      maxValue: 40,
      enName: 'Hell',
      jpName: '地獄',
    },
    {
      minValue: 41,
      maxValue: 50,
      enName: 'Paradise',
      jpName: '楽',
    },
    {
      minValue: 51,
      maxValue: 60,
      enName: 'Reality',
      jpName: '現実',
    },
  ],
  voice_actors: [
    {
      name: 'Kyoko',
      description: 'Tokyo accent, female',
    },
    {
      name: 'Kenichi',
      description: 'Tokyo accent, male',
    },
  ],
  kanji: [],
  radicals: [],
  vocabulary: [],
  radical_found_in_kanji: [],
  kanji_radical_compositions: [],
  visually_similar_kanji: [],
  vocabulary_kanji_compositions: [],
  vocabulary_readings: [],
  context_patterns: [],
  context_pattern_sentences: [],
  context_sentences: [],
};
const db = await JSONFilePreset('db.json', defaultData);
const minLevel = 1;
const maxLevel = 60;

for (let i = minLevel; i <= maxLevel; i++) {
  const spinner = ora(`Scraping Level ${i}`).start();
  console.time(`Level ${i}`);

  let $ = await fromURL(`https://www.wanikani.com/level/${i}`);

  let links = $('a[href^=https]')
    .map((_, el) => $(el).attr('href'))
    .toArray();

  for (let link of links) {
    let slug = link.split('/').pop();

    await wait(300);

    if (link.includes('radical')) {
      let scrapedRadical = await scrapeRadical(slug);
      db.data.radicals.push(scrapedRadical);
    } else if (link.includes('kanji')) {
      let scrapedKanji = await scrapeKanji(slug);
      db.data.kanji.push(scrapedKanji);
    } else if (link.includes('vocabulary')) {
      let scrapedVocabulary = await scrapeVocabulary(slug);
      db.data.vocabulary.push(scrapedVocabulary);
    }
  }

  spinner.succeed(`Scraped Level ${i}`);
  console.timeLog(`Level ${i}`);
}

await db.write();
