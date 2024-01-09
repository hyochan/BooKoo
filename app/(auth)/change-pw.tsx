import styled from '@emotion/native';
import {Typography} from 'dooboo-ui';
import {Stack} from 'expo-router';

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`;

export default function ChangePw(): JSX.Element {
  return (
    <Container>
      <Stack.Screen
        options={{
          title: 'change-pw',
        }}
      />
      <Typography.Body1>change-pw</Typography.Body1>
    </Container>
  );
}
