import {useState} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {Image} from 'react-native';
import {css} from '@emotion/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Button, Icon, useDooboo} from 'dooboo-ui';

import {googleClientIdIOS, googleClientIdWeb} from '../../config';
import {IC_GOOGLE} from '../icons';
import {t} from '../STRINGS';
import {colors} from '../theme';
import {showAlert} from '../utils/alert';

export type Provider = 'apple' | 'google';

type Props = {
  style?: StyleProp<ViewStyle>;
  provider: Provider;
  text: string;
  onUserCreated?: (idToken?: string) => void;
};

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: googleClientIdWeb,
  iosClientId: googleClientIdIOS,
});

export function ButtonSocialSignIn({
  onUserCreated,
  text,
  provider,
  style,
}: Props): JSX.Element {
  const {theme} = useDooboo();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const googleSignIn = async (): Promise<void> => {
    setIsGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();

      const {idToken} = await GoogleSignin.getTokens();

      if (!idToken) {
        return showAlert(t('errOccurred'));
      }

      onUserCreated?.(idToken);
    } catch (error: any) {
      if (error.code === statusCodes?.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        return;
      } else if (error.code === statusCodes?.IN_PROGRESS) {
        showAlert(t('signingIn'));

        return;
      } else if (error.code === statusCodes?.PLAY_SERVICES_NOT_AVAILABLE) {
        showAlert(t('playServiceIsNotActivated'));

        return;
      }

      showAlert(t('errOccurred'));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Button
      loading={isGoogleLoading}
      onPress={() => {
        switch (provider) {
          case 'google':
            googleSignIn();
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
        ) : (
          <Icon
            name="FacebookLogo"
            size={18}
            style={css`
              margin-right: 5px;
              color: ${theme.text.contrast};
            `}
          />
        )
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

export default ButtonSocialSignIn;
