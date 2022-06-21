import React from 'react';

import type { ArticleType } from '~/src/entities/article';
import type { SectionType } from '~/src/entities/sections';
import { sections } from '~/src/entities/sections';

const apiKey = 'WQ5uHonHIwdNXA2zfJtibvJ2wQWLbPyM';

type BackendCacheType = Record<
  SectionType,
  {
    status: 'loading' | 'success' | 'error';
    articles: ArticleType[];
  }
>;

type ActionType =
  | {
      type: 'fetchSuccessful';
      payload: { section: SectionType; articles: ArticleType[] };
    }
  | { type: 'fetchError'; payload: SectionType }
  | { type: 'startLoading'; payload: SectionType };

function reducer(state: BackendCacheType, { type, payload }: ActionType): BackendCacheType {
  switch (type) {
    case 'startLoading':
      return {
        ...state,
        [payload]: {
          ...state[payload],
          status: 'loading',
        },
      };
    case 'fetchSuccessful':
      return {
        ...state,
        [payload.section]: {
          status: 'success',
          articles: payload.articles,
        },
      };
    case 'fetchError':
      return {
        ...state,
        [payload]: {
          ...state[payload],
          status: 'error',
        },
      };
    default:
      throw new Error();
  }
}

const backendCache = {} as BackendCacheType;

for (const section of sections) {
  backendCache[section] = {
    status: 'success',
    articles: [],
  };
}

export function useArticles(section: SectionType, keywords: string, location: string) {
  const [data, dispatch] = React.useReducer(reducer, backendCache);

  React.useEffect(() => {
    dispatch({
      type: 'startLoading',
      payload: section,
    });

    fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((res: { results: ArticleType[] }) => {
        dispatch({
          type: 'fetchSuccessful',
          payload: {
            section,
            articles: res.results.filter(article => article.title && article.byline),
          },
        });
      })
      .catch(() => {
        dispatch({
          type: 'fetchError',
          payload: section,
        });
      });
  }, [section]);

  return {
    data: data[section].articles
      .filter(article => article.abstract.toLowerCase().includes(keywords.toLowerCase()))
      .filter(article => article.subsection.toLowerCase().includes(location.toLowerCase())),
    status: data[section].status,
  };
}
