import {Platform, Pressable} from 'react-native';
import {css} from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, SwitchToggle, useDooboo} from 'dooboo-ui';
import CustomPressable from 'dooboo-ui/uis/CustomPressable';
import {Stack, useRouter} from 'expo-router';

import {ROOT_URL} from '../../config';
import {SvgLogo} from '../icons';
import {t} from '../STRINGS';
import {AsyncStorageKey, delayPressIn, WEB_URL} from '../utils/constants';

export default function RootStack(): JSX.Element {
  const {replace, back} = useRouter();
  const {theme, themeType, changeThemeType} = useDooboo();

  return (
    <Stack
      screenOptions={{
        title: t('title'),
        headerTitle: () => (
          <Pressable
            onPress={() => {
              if (Platform.OS === 'web') {
                window.location.href = ROOT_URL;
              } else {
                replace('/');
              }
            }}
          >
            <SvgLogo height={30} width={94} />
          </Pressable>
        ),
        headerRight: () => (
          <SwitchToggle
            isOn={themeType === 'dark'}
            onPress={() => {
              const nextTheme = themeType === 'dark' ? 'light' : 'dark';
              changeThemeType(nextTheme);

              AsyncStorage.setItem(
                AsyncStorageKey.DarkMode,
                themeType === 'dark' ? 'false' : 'true',
              );
            }}
            size="small"
            style={css`
              margin-right: 16px;
            `}
          />
        ),
        headerStyle: {
          backgroundColor: theme.bg.basic,
          // @ts-ignore //? Works on web
          borderBottomColor: theme.role.border,
        },
        headerTintColor: theme.text.label,
        headerTitleStyle: {
          fontFamily: 'Pretendard-Bold',
          fontWeight: 'bold',
          color: theme.text.basic,
        },
        headerLeft: ({canGoBack}) =>
          canGoBack && (
            <CustomPressable
              delayHoverIn={delayPressIn}
              hitSlop={{top: 8, left: 8, right: 8, bottom: 8}}
              onPress={() =>
                canGoBack
                  ? back()
                  : Platform.OS === 'web'
                    ? (window.location.href = WEB_URL)
                    : replace('/')
              }
              style={
                Platform.OS === 'web'
                  ? css`
                      padding: 8px;
                      border-radius: 48px;
                    `
                  : css`
                      padding: 8px;
                      border-radius: 48px;
                      margin-left: -8px;
                    `
              }
            >
              <Icon name="CaretLeft" size={24} />
            </CustomPressable>
          ),
      }}
    />
  );
}
