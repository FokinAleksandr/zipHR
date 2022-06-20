import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>text</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
