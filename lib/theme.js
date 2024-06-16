import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export function getGlobalLightStyle() {
  return '#f0e7db'
}
export function getGlobalDarkStyle() {
  return '#202023'
}

const styles = {
  global: props => ({
    body: {
      bg: mode(getGlobalLightStyle(), getGlobalDarkStyle())(props),
    },
  }),
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 41,
      },
    },
  },

  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3,
    }),
  },
}

const fonts = {
  heading: "'M PLUS ROUNDED 1c'",
}

const colors = {
  glassTeal: '#88ccca',
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
})

export default theme
