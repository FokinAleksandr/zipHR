module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.js'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '~/src/(.*)': '<rootDir>/src/$1',
  },
};
