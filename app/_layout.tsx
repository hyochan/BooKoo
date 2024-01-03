import {useEffect, useState} from 'react';
import type {ColorSchemeName} from 'react-native';
import {useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {dark, light} from '@dooboo-ui/theme';
import styled, {css} from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDooboo} from 'dooboo-ui';
import StatusBarBrightness from 'dooboo-ui/uis/StatusbarBrightness';
import {SplashScreen} from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import * as WebBrowser from 'expo-web-browser';
import {useSetRecoilState} from 'recoil';

import RootProvider from '../src/providers';
import {authRecoilState} from '../src/recoil/atoms';
import RootStack from '../src/uis/RootStack';
import {AsyncStorageKey, COMPONENT_WIDTH} from '../src/utils/constants';
import {supabase} from '../src/utils/supabase';

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.paper};
`;

const Content = styled.View`
  align-self: center;
  width: 100%;
  flex: 1;
  max-width: ${COMPONENT_WIDTH + 'px'};
  background-color: ${({theme}) => theme.bg.basic};
`;

function Layout(): JSX.Element | null {
  const {assetLoaded} = useDooboo();
  const setAuthId = useSetRecoilState(authRecoilState);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const {status} = await supabase
          .from('users')
          .upsert({
            id: session?.user.id,
            // AuthType
            provider: session?.user.app_metadata.provider as any,
            provider_id: session?.user.app_metadata.provider_id,
            last_sign_in_at: session?.user.app_metadata.last_sign_in_at,
            full_name: session?.user.user_metadata.full_name,
            name: session?.user.user_metadata.name,
            sub: session?.user.user_metadata.sub,
            email: session?.user.email,
            email_confirmed_at: session?.user.email_confirmed_at,
          })
          .single();

        if (status !== 201) {
          await supabase.auth.signOut();

          return;
        }

        setAuthId(session?.user.id);
      }
    });
  }, [setAuthId]);

  useEffect(() => {
    if (assetLoaded) {
      SplashScreen.hideAsync();
    }
  }, [assetLoaded]);

  if (!assetLoaded) {
    return null;
  }

  return (
    <Container>
      <Content>
        <RootStack />
      </Content>
    </Container>
  );
}

export default function RootLayout(): JSX.Element | null {
  const colorScheme = useColorScheme();

  const [localThemeType, setLocalThemeType] = useState<string | undefined>(
    undefined,
  );

  // 테마 불러오기
  useEffect(() => {
    const initializeThemeType = async (): Promise<void> => {
      const darkMode = await AsyncStorage.getItem(AsyncStorageKey.DarkMode);

      const isDarkMode = !darkMode
        ? colorScheme === 'dark'
        : darkMode === 'true';

      SystemUI.setBackgroundColorAsync(
        isDarkMode ? dark.bg.basic : light.bg.basic,
      );

      setLocalThemeType(isDarkMode ? 'dark' : 'light');
    };

    initializeThemeType();
  }, [colorScheme]);

  if (!localThemeType) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={css`
        flex: 1;
      `}
    >
      <RootProvider initialThemeType={localThemeType as ColorSchemeName}>
        <>
          <StatusBarBrightness />
          <Layout />
        </>
      </RootProvider>
    </GestureHandlerRootView>
  );
}
