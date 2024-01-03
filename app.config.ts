import 'dotenv/config';

import type {ConfigContext, ExpoConfig} from '@expo/config';
import withAndroidLocalizedName from '@mmomtchev/expo-android-localized-app-name';
import dotenv from 'dotenv';
import {expand} from 'dotenv-expand';
import path from 'path';

import {version} from './package.json';

// https://github.com/expo/expo/issues/23727#issuecomment-1651609858
if (process.env.STAGE) {
  expand(
    dotenv.config({
      path: path.join(
        __dirname,
        ['./.env', process.env.STAGE].filter(Boolean).join('.'),
      ),
      override: true,
    }),
  );
}

const DEEP_LINK_URL = '[firebaseAppId].web.app';

const buildNumber = 1;

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'BooKoo',
  scheme: 'BooKoo',
  slug: 'BooKoo',
  privacy: 'public',
  platforms: ['ios', 'android', 'web'],
  version,
  orientation: 'default',
  icon: './assets/icon.png',
  plugins: [
    // @ts-ignore
    withAndroidLocalizedName,
    'expo-router',
    'expo-tracking-transparency',
    'expo-localization',
    '@react-native-google-signin/google-signin',
  ],
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#1B1B1B',
  },
  extra: {
    ROOT_URL: process.env.ROOT_URL,
    googleClientIdIOS: process.env.googleClientIdIOS,
    googleClientIdAndroid: process.env.googleClientIdAndroid,
    googleClientIdWeb: process.env.googleClientIdWeb,
    expoProjectId: process.env.expoProjectId,
    supabaseUrl: process.env.supabaseUrl,
    supabaseAnonKey: process.env.supabaseAnonKey,
    eas: {projectId: '0039426d-6590-4b93-9205-5179ab6d6806'},
  },
  updates: {
    fallbackToCacheTimeout: 0,
    // requestHeaders: {'expo-channel-name': 'production'},
    // url: '',
  },
  assetBundlePatterns: ['**/*'],
  userInterfaceStyle: 'automatic',
  locales: {
    ko: './assets/langs/ios/ko.json',
  },
  ios: {
    buildNumber: buildNumber.toString(),
    bundleIdentifier: 'dev.hyochan.bookoo',
    associatedDomains: [`applinks:${DEEP_LINK_URL}`],
    supportsTablet: true,
    entitlements: {
      'com.apple.developer.applesignin': ['Default'],
    },
    googleServicesFile: './GoogleService-Info.plist',
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      UIApplicationSceneManifest: {
        UISceneConfigurations: {},
      },
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [
            'com.googleusercontent.apps.1036469643891-qt6fo024m4bnaai9vppn3uf0jkoc2vvs',
          ],
        },
      ],
      NSCameraUsageDescription:
        'dooboo would like to take your picture and share your photo with users in dooboo.',
      NSPhotoLibraryAddUsageDescription:
        'dooboo would like to save photos that you have selected to your photo gallery',
      NSPhotoLibraryUsageDescription:
        'dooboo would like to access your gallery for you to pick one and share with others.',
      NSUserTrackingUsageDescription:
        'dooboo would like to access IDFA for tracking purpose for qualified ads servation.',
      NSLocationWhenInUseUsageDescription:
        'Give dooboo permission access the location for sending better push notification service.',
    },
  },
  android: {
    userInterfaceStyle: 'automatic',
    permissions: [
      'RECEIVE_BOOT_COMPLETED',
      'CAMERA',
      'CAMERA_ROLL',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'NOTIFICATIONS',
      'USER_FACING_NOTIFICATIONS',
    ],
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive_icon.png',
      backgroundColor: '#2F2F2F',
    },
    package: 'dev.hyochan.bookoo',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: {
          scheme: 'https',
          host: DEEP_LINK_URL,
          pathPrefix: '/',
        },
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  description: 'Global Shared Household Finance App.',
  web: {bundler: 'metro'},
});
