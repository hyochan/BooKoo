import {DevSettings, Platform} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button, Typography} from 'dooboo-ui';
import StatusBarBrightness from 'dooboo-ui/uis/StatusbarBrightness';
import * as Updates from 'expo-updates';

import {t} from '../STRINGS';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.paper};
  padding: 0 24px;

  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export default function FallbackComponent(): JSX.Element {
  return (
    <Container>
      <StatusBarBrightness />
      <Typography.Heading5
        style={css`
          margin-bottom: 12px;
          text-align: center;
        `}
      >
        {`${t('error')}`}
      </Typography.Heading5>
      <Typography.Body3
        style={css`
          font-family: Pretendard-Bold;
          line-height: 28px;
          margin-bottom: 22px;
          text-align: center;
        `}
      >
        {`${t('errOccurred')}`}
      </Typography.Body3>
      <Button
        borderRadius={28}
        color="light"
        onPress={async () => {
          if (__DEV__) {
            DevSettings.reload();

            return;
          }

          if (Platform.OS === 'web') {
            window.location.reload();

            return;
          }

          const update = await Updates.checkForUpdateAsync();

          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
          }

          await Updates.reloadAsync();
        }}
        styles={{
          text: css`
            font-size: 14px;
            font-family: Pretendard-Bold;
          `,
        }}
        text={t('retry')}
        type="outlined"
      />
    </Container>
  );
}
