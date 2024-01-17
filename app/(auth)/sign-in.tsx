import {useState} from 'react';
import {Pressable} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button, EditText, Icon, Typography, useDooboo} from 'dooboo-ui';
import {Stack} from 'expo-router';

import {validateEmail} from '../../src/utils/common';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};
`;

const TitleContainer = styled.View`
  padding: 28px;
`;

const Content = styled.View`
  padding: 40px;
  gap: 20px;
`;

type Props = {};

export default function Page({}: Props): JSX.Element {
  const {theme} = useDooboo();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Stack.Screen options={{title: 'Sign In'}} />
      <TitleContainer>
        <Typography.Heading1
          style={css`
            color: ${theme.text.basic};
          `}
        >
          Email Login
        </Typography.Heading1>
      </TitleContainer>
      <Content>
        <EditText
          colors={{
            focused: theme.role.primary,
          }}
          endElement={
            validateEmail(email) ? (
              <Icon color={theme.role.primary} name="Check" size={18} />
            ) : null
          }
          label="Email"
          onChangeText={setEmail}
          placeholder="aa@email.com"
          textInputProps={{
            keyboardType: 'email-address',
          }}
          value={email}
        />
        <EditText
          colors={{
            focused: theme.role.primary,
          }}
          endElement={
            password ? (
              <Icon color={theme.role.primary} name="Check" size={18} />
            ) : null
          }
          label="Password"
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry
          value={password}
        />
        <Button
          disabled={!email || !password || !validateEmail(email)}
          onPress={() => {}}
          style={css`
            margin-top: 20px;
          `}
          styles={{
            container: css`
              padding: 18.5px;
            `,
            text: css`
              font-family: Pretendard-Bold;
            `,
          }}
          text="Sign In"
        />
        <Pressable>
          <Typography.Body2
            style={[
              css`
                color: ${theme.role.primary};

                font-family: Pretendard-Bold;
                align-self: center;
                text-decoration: underline;
                /* // TODO: text-decoration-color is not working in emotion */
              `,
              {
                textDecorationColor: theme.role.primary,
              },
            ]}
          >
            Forgot Password?
          </Typography.Body2>
        </Pressable>
      </Content>
    </Container>
  );
}
