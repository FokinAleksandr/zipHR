import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { SectionType } from '~/src/entities/sections';
import { uiSections } from '~/src/entities/sections';
import { storage } from '~/src/mmkv';
import { Article, ArticleImage, Articles, ArticleTitle, PublishedByText } from '~/src/ui/articles';
import { InputFilters } from '~/src/ui/Filters';
import { Header, HeaderTitle } from '~/src/ui/Header';
import { Input } from '~/src/ui/Input';
import { FlexGrow } from '~/src/ui/layout';
import { ScreenWrapper } from '~/src/ui/ScreenWrapper';
import { Section, Sections, SectionsWrapper, SectionText, SectionTitle } from '~/src/ui/sections';
import { useArticles } from '~/src/useArticles';

export function App() {
  const [selectedSection, setSection] = React.useState<SectionType>(() => {
    const preservedSectionFromPreviousSession = storage.getString('selectedSection');
    if (preservedSectionFromPreviousSession) {
      return preservedSectionFromPreviousSession as SectionType;
    }
    return 'home';
  });
  const [keywords, setKeywords] = React.useState('');
  const [location, setLocation] = React.useState('');
  const { data, status } = useArticles(selectedSection, keywords, location);

  const renderSection = (section: SectionType) => {
    const handleSectionPress = () => {
      setSection(section);
      storage.set('selectedSection', section);
    };

    return (
      <Section isSelected={selectedSection === section} onPress={handleSectionPress}>
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
    if (data.length) {
      return data.map(item => (
        <Article key={item.url}>
          {item.multimedia && <ArticleImage source={{ uri: item.multimedia[0].url }} />}
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
    }

    if (status === 'loading') {
      return <ActivityIndicator size="large" />;
    }

    if (status === 'error') {
      return <Text>Something went wrong</Text>;
    }

    return <Text>No data</Text>;
  };

  return (
    <SafeAreaProvider>
      <ScreenWrapper edges={['top']}>
        <Header>
          <HeaderTitle>NYT News Feed</HeaderTitle>
        </Header>
        <SectionsWrapper>
          <SectionTitle>Section</SectionTitle>
          <Sections horizontal showsHorizontalScrollIndicator={false}>
            {uiSections.map(section => (
              <View key={section.toString()}>
                {renderSection(section[0])}
                {renderSection(section[1])}
              </View>
            ))}
          </Sections>
        </SectionsWrapper>
        <InputFilters>
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
        </InputFilters>
        <Articles>{renderArticles()}</Articles>
      </ScreenWrapper>
    </SafeAreaProvider>
  );
}
