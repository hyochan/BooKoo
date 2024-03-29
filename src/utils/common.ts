import {Linking, Platform} from 'react-native';
import {z} from 'zod';

export const openURL = async (url: string): Promise<void> => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }

  if (Platform.OS === 'web') {
    window.open(url, '_blank');
  }
};

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const isEmailValid = (value: string): boolean => {
  try {
    z.string().email().parse(value);

    return true;
  } catch {
    return false;
  }
};
