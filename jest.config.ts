import type {Config} from '@jest/types';

process.env.TZ = 'Asia/Seoul';

export default async (): Promise<Config.InitialOptions> => {
  return {
    // https://github.com/jefflau/jest-fetch-mock#to-setup-for-all-tests
    automock: false,
    resetMocks: false,
    preset: 'jest-expo',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      // eslint-disable-next-line max-len
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|dooboo-ui|@dooboo-ui)',
    ],
    modulePaths: ['<rootDir>'],
    moduleDirectories: ['node_modules'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'svg', 'png', 'json'],
    modulePathIgnorePatterns: [
      '<rootDir>/build/',
      '<rootDir>/node_modules/',
      '<rootDir>/.history/',
    ],
    moduleNameMapper: {
      '\\.svg': '<rootDir>/__mocks__/svgMock.js',
      '.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
    },
    setupFiles: [
      '<rootDir>/test/testSetup.ts',
      './node_modules/react-native-gesture-handler/jestSetup.js',
    ],
    cacheDirectory: '.jest/cache',
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './test/testSetupAfterEnv.ts',
    ],
    haste: {
      defaultPlatform: 'ios',
      platforms: ['android', 'ios', 'native'],
    },
    coveragePathIgnorePatterns: ['/node_modules/'],
  };
};
