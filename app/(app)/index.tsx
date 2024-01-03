import {useCallback, useState} from 'react';
import styled from '@emotion/native';
import {Button, Typography} from 'dooboo-ui';
import {Redirect} from 'expo-router';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {authRecoilState} from '../../src/recoil/atoms';
import {t} from '../../src/STRINGS';
import {supabase} from '../../src/utils/supabase';

const Container = styled.View`
  background-color: ${({theme}) => theme.bg.basic};
  flex: 1;
  align-self: stretch;
  padding-bottom: 120px;

  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export default function Index(): JSX.Element {
  const setAuthId = useSetRecoilState(authRecoilState);
  const authId = useRecoilValue(authRecoilState);
  const [loading, setLoading] = useState(false);

  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    setAuthId(null);
  }, [setAuthId]);

  if (!authId) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Container>
      <Typography.Heading1>Index</Typography.Heading1>
      <Button loading={loading} onPress={signOut} text={t('signOut')} />
    </Container>
  );
}
