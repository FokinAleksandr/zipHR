import styled from '@emotion/native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Article, ArticleImage, Articles, ArticleTitle, PublishedByText } from '~/src/ui/articles';
import { Header } from '~/src/ui/Header';
import { Input } from '~/src/ui/Input';
import { Section, Sections, SectionsWrapper, SectionText, SectionTitle } from '~/src/ui/sections';
import { useArticles } from '~/src/useArticles';

import type { ArrayElement } from './utils';

const scrollViewSections = [
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

const sections = scrollViewSections.flat();

type SectionsType = ArrayElement<typeof sections>;

export function App() {
  const [selectedSection, setSection] = React.useState<SectionsType>('home');
  const [keywords, setKeywords] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { data, status } = useArticles(selectedSection, keywords, location);

  const renderSection = (section: SectionsType) => {
    return (
      <Section isSelected={selectedSection === section} onPress={() => setSection(section)}>
        <SectionText
          isSelected={selectedSection === section}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {section}
        </SectionText>
      </Section>
    );
  };

  const renderArticles = () => {
    if (status === 'loading') {
      return <ActivityIndicator size="large" />;
    }

    return data.map(item => (
      <Article key={item.title}>
        <ArticleImage source={{ uri: item.multimedia[0].url }} />
        <FlexGrow>
          <ArticleTitle>{item.title}</ArticleTitle>
          <View>
            <PublishedByText numberOfLines={2} ellipsizeMode="tail">
              {item.byline}
            </PublishedByText>
          </View>
          <Text>
            Published:{' '}
            {new Date(item.published_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
        </FlexGrow>
      </Article>
    ));
  };

  return (
    <SafeAreaProvider>
      <Wrapper edges={['top']}>
        <Header>
          <HeaderTitle>NYT News Feed</HeaderTitle>
        </Header>
        <SectionsWrapper>
          <SectionTitle>Section</SectionTitle>
          <Sections horizontal showsHorizontalScrollIndicator={false}>
            {scrollViewSections.map(section => (
              <View key={section.toString()}>
                {renderSection(section[0])}
                {renderSection(section[1])}
              </View>
            ))}
          </Sections>
        </SectionsWrapper>
        <Filters>
          <Input
            autoCapitalize="none"
            placeholder="LOCATION"
            value={location}
            onChangeText={setLocation}
          />
          <Input
            autoCapitalize="none"
            placeholder="KEYWORDS"
            value={keywords}
            onChangeText={setKeywords}
          />
        </Filters>
        <Articles>{renderArticles()}</Articles>
      </Wrapper>
    </SafeAreaProvider>
  );
}

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: rgb(96, 133, 247);
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  color: white;
`;

const Filters = styled.View`
  background-color: rgb(133, 191, 223);
  flex-direction: row;
  padding: 12px 0 12px 12px;
`;

const FlexGrow = styled.View`
  flex: 1;
`;
