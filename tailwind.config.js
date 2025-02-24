const {blue} = require('react-native-reanimated/lib/typescript/Colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    screens: {
      sm: '300px',
      md: '400px',
      lg: '880px',
      tablet: '1024px',
    },
    extend: {
      fontFamily: {
        AvenirLTProBlack: 'AvenirLTProBlack',
        AvenirLTProBlackOblique: 'AvenirLTProBlackOblique',
        AvenirLTProBook: 'AvenirLTProBook',
        AvenirLTProBookOblique: 'AvenirLTProBookOblique',
        AvenirLTProHeavy: 'AvenirLTProHeavy',
        AvenirLTProHeavyOblique: 'AvenirLTProHeavyOblique',
        AvenirLTProLight: 'AvenirLTProLight',
        AvenirLTProLight: 'AvenirLTProLight',
        AvenirLTProMedium: 'AvenirLTProMedium',
        AvenirLTProMediumOblique: 'AvenirLTProMediumOblique',
        AvenirLTProOblique: 'AvenirLTProOblique',
        AvenirLTProRoman: 'AvenirLTProRoman'
      },

      colors: {
        primary: '#FFFFFF',
        PrimaryFocus: "#FFFFFF33",
        whiteBtnText: "#141316",
        title: '#272727',
        subT: '#5e5e5e',
        offWhite: '#E6ECEC',
        secondary: '#F4FAFA',
        white100: '#EFEFEF',
        border: '#DFDFDF',
        primary100: '#EEF6F6',
        primary200: '#9BB3B5',
        danger: '#CE3535',
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.btn': {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        '.resize-repeat': {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};
