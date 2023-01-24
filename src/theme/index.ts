import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'IBM Plex Sans', sans-serif`,
    body: `'IBM Plex Sans', sans-serif`,
  },
  colors: {
    primary: {
      50: '#2C2F36',
      75: '#433BCE',
      80: '#699BF7',
      100: '#2EB8E4',
    },
  },
  components: {},
});

export default theme;
