import {Platform} from 'react-native'

export const colors = {
  primary:'#FF9800',
  primaryDark:'#F57C00',
  primaryHue:'rgba(245, 124, 0, 0.4)',
  accent:'#FFC107',
  text:'#212121',
  textSecondary:'#757575',
  darkWhite:'rgba(226, 226, 226, 0.9)',
  darkWhiteSelected:'rgba(188, 188, 188, 0.9)',
  green:'#05c46b',
  red:'#ff5e57'
};

export const fonts = Platform.OS === 'ios' ? {
    normal: {
        fontFamily: 'IRANSansMobile',
        color:colors.text
    },
    bold: {
        fontFamily: 'IRANSansMobile',
        fontWeight: 'bold',
        color:colors.text
    }
} : {
    normal: {
        fontFamily: 'IRANSansMobile',
        color:colors.text
    },
    bold: {
        fontFamily: 'IRANSansMobile_Bold',
        color:colors.text
    }
};
