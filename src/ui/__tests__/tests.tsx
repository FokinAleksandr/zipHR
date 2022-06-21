import * as React from 'react';
import renderer from 'react-test-renderer';

import { Article, ArticleImage, Articles, ArticleTitle, PublishedByText } from '~/src/ui/articles';
import { Header } from '~/src/ui/Header';

describe('snapshot tests', () => {
  it('Header', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ArticleImage', () => {
    const tree = renderer
      .create(
        <ArticleImage
          source={{
            uri: 'https://static01.nyt.com/images/2022/06/17/business/17Adviser-illo/17Adviser-illo-thumbLarge.jpg',
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ArticleImage', () => {
    const tree = renderer.create(<Article />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Articles', () => {
    const tree = renderer.create(<Articles />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ArticleTitle', () => {
    const tree = renderer.create(<ArticleTitle>Some title</ArticleTitle>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('PublishedByText', () => {
    const tree = renderer.create(<PublishedByText>Published by somebody</PublishedByText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

export {};
