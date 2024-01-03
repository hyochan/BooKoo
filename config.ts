import Constants from 'expo-constants';

const extra = Constants?.expoConfig?.extra;

export const ROOT_URL = extra?.ROOT_URL;
export const googleClientIdIOS = extra?.googleClientIdIOS;
export const googleClientIdAndroid = extra?.googleClientIdAndroid;
export const googleClientIdWeb = extra?.googleClientIdWeb;
export const expoProjectId = extra?.expoProjectId;
export const supabaseUrl = extra?.supabaseUrl || 'http://test';
export const supabaseAnonKey = extra?.supabaseAnonKey || 'http://test';
export const appVersion = Constants?.expoConfig?.version;
