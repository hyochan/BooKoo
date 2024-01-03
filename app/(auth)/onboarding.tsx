import {useCallback, useState} from 'react';
import type {ImageSourcePropType, ListRenderItem} from 'react-native';
import {Image, View} from 'react-native';
import styled, {css} from '@emotion/native';
import {Typography, useDooboo} from 'dooboo-ui';
import {Redirect, Stack} from 'expo-router';
import {useRecoilValue} from 'recoil';

import {
  IC_ONBOARDING_1,
  IC_ONBOARDING_2,
  IC_ONBOARDING_3,
} from '../../src/icons';
import {authRecoilState} from '../../src/recoil/atoms';
import {t} from '../../src/STRINGS';
import Carousel from '../../src/uis/Carousel';

type OnboardingData = {
  title: string;
  description: string;
  icon: ImageSourcePropType;
};

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.bg.basic};

  justify-content: center;
  align-items: center;
`;

export default function Onboarding(): JSX.Element {
  const authId = useRecoilValue(authRecoilState);
  const [width, setWidth] = useState(0);
  const {theme} = useDooboo();

  const onboardingData: OnboardingData[] = [
    {
      title: t('onboarding.title1'),
      description: t('onboarding.message1'),
      icon: IC_ONBOARDING_1,
    },
    {
      title: t('onboarding.title2'),
      description: t('onboarding.message2'),
      icon: IC_ONBOARDING_2,
    },
    {
      title: t('onboarding.title3'),
      description: t('onboarding.message3'),
      icon: IC_ONBOARDING_3,
    },
  ];

  const renderIndicator = useCallback(
    (length: number, selectedIndex: number) => {
      return (
        <View
          style={css`
            flex-direction: row;
            align-items: center;
            gap: 3px;
          `}
        >
          {Array.from({length}).map((_, index) => (
            <View
              key={`indicator-${index}`}
              style={css`
                width: 8px;
                height: 8px;
                border-radius: 4px;
                background-color: ${index === selectedIndex
                  ? theme.text.basic
                  : theme.text.placeholder};
                margin-right: 4px;
              `}
            />
          ))}
        </View>
      );
    },
    [theme.text.basic, theme.text.placeholder],
  );

  const renderOnboardingItem: ListRenderItem<OnboardingData> = useCallback(
    ({item: {description, icon, title}}) => {
      return (
        <View
          style={css`
            padding: 0 96px;
            align-self: stretch;
            width: ${width + 'px'};

            align-items: center;
            justify-content: center;
            gap: 16px;
          `}
        >
          <Image source={icon} />
          <Typography.Heading5>{title}</Typography.Heading5>
          <Typography.Body3
            style={css`
              text-align: center;
            `}
          >
            {description}
          </Typography.Body3>
        </View>
      );
    },
    [width],
  );

  if (authId) {
    return <Redirect href="/" />;
  }

  return (
    <Container>
      <Stack.Screen options={{title: t('onboarding.title')}} />
      <Carousel
        data={onboardingData}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onLayout={(e) => {
          setWidth(e.nativeEvent.layout.width);
        }}
        renderIndicator={renderIndicator}
        renderItem={renderOnboardingItem}
      />
    </Container>
  );
}
