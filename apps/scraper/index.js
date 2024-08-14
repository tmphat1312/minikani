import {
  scrapeRadical,
  scrapeKanji,
  scrapeVocabulary,
} from './scripts/index.js';

const levels = [
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
];
const voice_actors = [
  {
    name: 'Kyoko',
    description: 'Tokyo accent, female',
  },
  {
    name: 'Kenichi',
    description: 'Tokyo accent, male',
  },
];
