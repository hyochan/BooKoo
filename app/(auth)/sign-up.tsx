import {useState} from 'react';
import type {FieldValues, SubmitHandler} from 'react-hook-form';
import {Controller, useForm} from 'react-hook-form';
import {Pressable} from 'react-native';
import styled, {css} from '@emotion/native';
import {Button, EditText, Icon, Typography, useDooboo} from 'dooboo-ui';
import {Stack} from 'expo-router';

import {t} from '../../src/STRINGS';
import {isEmailValid} from '../../src/utils/common';

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

export default function Page(): JSX.Element {
  const {theme} = useDooboo();
  const {control, handleSubmit, formState} = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async ({email, password}) => {
    console.log('email: ', email);
    console.log('password: ', password);
  };

  return (
    <Container>
      <Stack.Screen options={{title: t('register')}} />
      <TitleContainer>
        <Typography.Heading1
          style={css`
            color: ${theme.text.basic};
          `}
        >
          {t('register')}
        </Typography.Heading1>
      </TitleContainer>
      <Content>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <EditText
              colors={{
                focused: theme.role.primary,
              }}
              endElement={
                value && isEmailValid(value) ? (
                  <Icon color={theme.role.primary} name="Check" size={18} />
                ) : null
              }
              label={t('email')}
              onChangeText={onChange}
              placeholder="your@email.com"
              textInputProps={{
                keyboardType: 'email-address',
              }}
              value={value}
            />
          )}
          rules={{required: true, validate: (value) => isEmailValid(value)}}
        />

        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <EditText
              colors={{
                focused: theme.role.primary,
              }}
              endElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    color={theme.role.primary}
                    name={showPassword ? 'Eye' : 'EyeClosed'}
                    size={18}
                  />
                </Pressable>
              }
              label={t('password')}
              onChangeText={onChange}
              placeholder="********"
              secureTextEntry={showPassword ? false : true}
              value={value}
            />
          )}
          rules={{
            required: true,
          }}
        />
        <Button
          disabled={!formState.isValid}
          onPress={handleSubmit(onSubmit)}
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
          text={t('register')}
        />
      </Content>
    </Container>
  );
}
