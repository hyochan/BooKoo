import {memo, useEffect} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {Image, Platform} from 'react-native';
import {css} from '@emotion/native';
import {Button, useDooboo} from 'dooboo-ui';
import {Prompt, ResponseType} from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

import {
  expoProjectId,
  googleClientIdAndroid,
  googleClientIdIOS,
  googleClientIdWeb,
} from '../../config';
import {IC_GOOGLE} from '../icons';
import {colors} from '../theme';

export type Provider = 'apple' | 'google';

type Props = {
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  provider: Provider;
  text: string;
  onUserCreated?: (accessToken?: string) => void;
};

function ButtonSocialSignIn({
  onUserCreated,
  text,
  provider,
  style,
  loading,
}: Props): JSX.Element {
  const {theme} = useDooboo();

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      prompt: Prompt.SelectAccount,
      usePKCE: false,
      scopes: ['openid', 'profile', 'email'],
      expoClientId: expoProjectId,
      responseType: Platform.select({
        web: ResponseType.Token,
      }),
      clientId: googleClientIdWeb,
      androidClientId: googleClientIdAndroid,
      iosClientId: googleClientIdIOS,
      webClientId: googleClientIdWeb,
    });

  useEffect(() => {
    if (googleResponse?.type === 'success' && googleResponse.authentication) {
      const idToken = googleResponse.authentication.idToken;

      onUserCreated?.(idToken);
    }
  }, [googleResponse, onUserCreated]);

  return (
    <Button
      disabled={provider === 'google' ? !googleRequest : false}
      loading={loading}
      onPress={() => {
        switch (provider) {
          case 'google':
            googlePromptAsync();
            break;
          default:
          // Not implemented yet
        }
      }}
      startElement={
        provider === 'google' ? (
          <Image
            source={IC_GOOGLE}
            style={css`
              height: 16px;
              width: 15px;
              margin-right: 6px;
            `}
          />
        ) : undefined
      }
      style={style}
      styles={{
        container: css`
          background-color: ${colors[provider] || theme.text.basic};
          border-width: 0.3px;
          height: 52px;
        `,
        text: css`
          padding: 2px;
          color: ${provider === 'google'
            ? theme.text.basic
            : theme.text.contrast};
          font-size: 20px;
        `,
      }}
      text={text}
      type={provider === 'google' ? 'text' : 'solid'}
    />
  );
}

export default memo(ButtonSocialSignIn);
