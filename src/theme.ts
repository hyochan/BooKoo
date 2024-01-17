import type {DoobooThemeParams} from '@dooboo-ui/theme';

export const colors = {
  apple: '#000000',
  google: '#E04238',
  paleGrey: '#DDE2EC',
  whiteGray: '#F9FBFD',
  lightGray: '#DDE2EC',
  mediumGray: '#869AB7',
  cloudyBlue: '#AFC2DB',
  gray: '#979797',
  red: '#E6677E',
  orange: '#F6A623',
  yellow: '#EED100',
  green: '#24CD97',
  blue: '#679EFF',
  purple: '#B669F9',
  white: '#FFFFFF',
  carnation: '#FF728D',
  dusk: '#414D6B',
  main: '#1DD3A9',
};

export const light: DoobooThemeParams = {
  role: {
    primary: colors.main,
    border: colors.paleGrey,
  },
  text: {
    basic: colors.dusk,
    label: colors.mediumGray,
  },
  button: {
    primary: {
      bg: colors.main,
    },
  },
};

export type CustomAppTheme = typeof light & DoobooThemeParams;

export const dark: CustomAppTheme = {
  bg: {
    basic: colors.dusk,
  },
  role: {
    border: colors.mediumGray,
  },
};

export const theme = {
  light,
  dark,
};
