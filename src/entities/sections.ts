import type { ArrayElement } from '~/src/utils';

export const uiSections = [
  ['home', 'world'],
  ['arts', 'automobiles'],
  ['books', 'business'],
  ['fashion', 'food'],
  ['insider', 'magazine'],
  ['movies', 'nyregion'],
  ['obituaries', 'opinion'],
  ['politics', 'realestate'],
  ['science', 'sports'],
  ['sundayreview', 'technology'],
  ['theater', 't-magazine'],
  ['travel', 'upshot'],
  ['us', 'health'],
] as const;

const sections = uiSections.flat();

export type SectionType = ArrayElement<typeof sections>;
