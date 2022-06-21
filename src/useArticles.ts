import React from 'react';

type ArticleType = {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: unknown[];
  org_facet: unknown[];
  per_facet: unknown[];
  geo_facet: unknown[];
  multimedia: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }[];
  short_url: string;
}

const apiKey = 'WQ5uHonHIwdNXA2zfJtibvJ2wQWLbPyM';

export function useArticles(section: string, keywords: string, location: string) {
  const [data, setData] = React.useState<ArticleType[]>([]);
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');

  React.useEffect(() => {
    setStatus('loading');
    fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`).then(res => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    }).then((res: { results: ArticleType[] }) => {
      setData(res.results);
      setStatus('success');
    }).catch(() => {
      setData([]);
      setStatus('error');
    });
  }, [section]);

  return {
    data: data
      .filter(article => article.abstract.toLowerCase().includes(keywords.toLowerCase()))
      .filter(article => article.subsection.toLowerCase().includes(location.toLowerCase())),
    status
  };
}
