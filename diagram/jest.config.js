module.exports = {
  preset: '@babel/preset-env',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(jest-)?react|react-dom|@react-native-community|@storybook|@babel/runtime)/',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  extensionsToTreatAsEsm: ['.js'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
