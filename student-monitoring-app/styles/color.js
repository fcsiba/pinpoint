import { Platform } from 'react-native';
import normalize from 'react-native-normalize';


const palette = {
  purple: '#5A31F4',
  green: '#0ECD9D',
  red: '#CD0E61',
  black: '#0B0B0B',
  white: '#F0F2F3',
}

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    btnText: '#636363',
    secondary: '#282828',
  },
  textVariants: {
    header: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
      fontSize: normalize(30),
      fontWeight: 'bold',
    },
    body: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
      fontSize: 16,
    },
    button: {
      fontSize: 15
    },
    headerCompanyName: {
      fontSize: normalize(30),
      color: "#636363"
    },
    label:
    {
      fontSize: normalize(20),
      fontWeight: 'bold'
    }
  }
};