import {useCallback, useState} from 'react';
import {Platform, Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {css} from '@emotion/native';
import {Button, Typography, useDooboo} from 'dooboo-ui';
import * as AppleAuthentication from 'expo-apple-authentication';
import {useRouter} from 'expo-router';
import {useSetRecoilState} from 'recoil';

import {SvgLogo} from '../../src/icons';
import {authRecoilState} from '../../src/recoil/atoms';
import {t} from '../../src/STRINGS';
import ButtonSocialSignIn from '../../src/uis/ButtonSocialSignIn';
import {showAlert} from '../../src/utils/alert';
import {openURL} from '../../src/utils/common';
import {DOOBOO_PRIVACY_URL, DOOBOO_TERM_URL} from '../../src/utils/constants';
import {supabase} from '../../src/utils/supabase';

const renderAgreements = (texts: string): (JSX.Element | string)[] => {
  return texts.split('**').map((str, i) =>
    i % 2 === 0 ? (
      str
    ) : (
      <Typography.Body3
        key={str}
        onPress={() => {
          if (str === t('privacyAndPolicy')) {
            return openURL(DOOBOO_PRIVACY_URL);
          }

          openURL(DOOBOO_TERM_URL);
        }}
        style={css`
          text-decoration-line: underline;
        `}
      >
        {str}
      </Typography.Body3>
    ),
  );
};

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};
`;

export default function Intro(): JSX.Element {
  const setAuthId = useSetRecoilState(authRecoilState);
  const {bottom} = useSafeAreaInsets();
  const {theme, themeType} = useDooboo();
  const {push, replace} = useRouter();
  const [height, setHeight] = useState(0);

  const googleSignIn = useCallback(
    async (idToken?: string) => {
      if (!idToken) {
        return;
      }

      const {error} = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        return showAlert(t('errOccurred'));
      }

      replace('/');
    },
    [replace],
  );

  const appleSignIn = useCallback(async (): Promise<void> => {
    try {
      const {identityToken} = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (identityToken) {
        const res = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: identityToken,
        });

        console.log('apple res', res);
      }
    } catch (e: any) {
      if (
        e.code === 'ERR_REQUEST_CANCELED' ||
        e.code === 'ERR_CANCELED' ||
        e.code === 'ERR_REQUEST_UNKNOWN'
      ) {
        return;
      }

      showAlert(t('errOccurred'));
    }
  }, []);

  return (
    <Container
      onLayout={(e) => {
        setHeight(e.nativeEvent.layout.height);
      }}
      style={css`
        padding-bottom: ${bottom + 'px'};
      `}
    >
      <ScrollView
        contentContainerStyle={css`
          align-self: stretch;
          justify-content: center;
          align-items: center;
        `}
      >
        <View
          style={css`
            height: ${height + 'px'};

            justify-content: center;
            align-items: center;
            gap: 20px;
          `}
        >
          <SvgLogo
            height={64}
            style={css`
              margin: 60px 0 160px;
            `}
            width={212}
          />
          <Button
            onPress={() => {
              setAuthId('1234');
              replace('/');
              // push('/sign-in');
            }}
            style={css`
              width: 260px;
            `}
            styles={{
              container: css`
                padding: 20px 0;
              `,
              text: css`
                font-size: 18px;
                font-family: Pretendard-Bold;
              `,
            }}
            text={t('signIn')}
          />
          <Typography.Body3
            style={css`
              color: ${theme.text.label};
            `}
          >
            {t('intro.doNotHaveAccount')}
            <Pressable
              hitSlop={{
                bottom: 8,
                left: 8,
                right: 8,
                top: 8,
              }}
              onPress={() => push('/sign-up')}
            >
              <Typography.Body3
                style={css`
                  margin-left: 4px;
                  color: ${theme.role.primary};
                  text-decoration: underline;
                  text-decoration-color: ${theme.role.primary};
                `}
              >
                {t('signUp')}
              </Typography.Body3>
            </Pressable>
          </Typography.Body3>
          <Typography.Body3
            style={css`
              margin-top: 20px;
              color: ${theme.text.label};
            `}
          >
            -------------- {t('intro.orLoginWith')} --------------
          </Typography.Body3>
          <View
            style={css`
              padding: 0 60px;

              justify-content: center;
              align-items: center;
              gap: 12px;
            `}
          >
            <ButtonSocialSignIn
              onUserCreated={googleSignIn}
              provider="google"
              style={css`
                width: 260px;
              `}
              text={t('intro.loginWithProvider', {provider: t('google')})}
            />
            {Platform.OS === 'ios' ? (
              <AppleAuthentication.AppleAuthenticationButton
                buttonStyle={
                  themeType === 'light'
                    ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                    : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                }
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                cornerRadius={4}
                onPress={appleSignIn}
                style={css`
                  height: 52px;
                  width: 260px;
                `}
              />
            ) : null}
            <Typography.Body4
              style={css`
                margin: 20px 20px 60px;
                text-align: center;
                color: ${theme.text.placeholder};
              `}
            >
              {renderAgreements(
                t('registerPolicyAgreement', {
                  termsForAgreement: `**${t('termsOfAgreement')}**`,
                  privacyAndPolicy: `**${t('privacyAndPolicy')}**`,
                }),
              )}
            </Typography.Body4>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
