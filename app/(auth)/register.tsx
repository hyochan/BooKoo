import styled from '@emotion/native';
import {Typography} from 'dooboo-ui';
import {Stack} from 'expo-router';

import {t} from '../../src/STRINGS';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`;

export default function Register(): JSX.Element {
  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('signUp'),
        }}
      />
      <Typography.Body1>Sign Up</Typography.Body1>
    </Container>
  );
}
