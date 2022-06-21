import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useArticles } from './useArticles';

export function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Screen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

type SectionsType =
  'arts'
  | 'automobiles'
  | 'books'
  | 'business'
  | 'fashion'
  | 'food'
  | 'health'
  | 'home'
  | 'insider'
  | 'magazine'
  | 'movies'
  | 'nyregion'
  | 'obituaries'
  | 'opinion'
  | 'politics'
  | 'realestate'
  | 'science'
  | 'sports'
  | 'sundayreview'
  | 'technology'
  | 'theater'
  | 't-magazine'
  | 'travel'
  | 'upshot'
  | 'us'
  | 'world';

function Screen() {
  const [section, setSection] = React.useState<SectionsType>('home');
  const [keywords, setKeywords] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { data, status } = useArticles(section, keywords, location);

  return (
    <Text>
      {JSON.stringify(data, null, 2)}
    </Text>
  );
}
