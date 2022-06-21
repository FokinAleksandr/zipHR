import * as React from 'react';
import renderer from 'react-test-renderer';

import { Header } from '~/src/ui/Header';

describe('snapshot tests', () => {
  it('Header', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

export {};
