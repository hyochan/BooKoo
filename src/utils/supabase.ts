import 'react-native-url-polyfill/auto';

import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

import {supabaseAnonKey, supabaseUrl} from '../../config';
import type {Database} from '../types/supabase';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.select({
      default: AsyncStorage,
      ios: ExpoSecureStoreAdapter,
      android: ExpoSecureStoreAdapter,
    }),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
