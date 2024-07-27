import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { headingTheme } from "./components/Heading";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "'Tajawal', sans-serif",
      margin: 0,
      bg: mode("#fcfdfe", "gray.800")(props),
      color: mode("black", "#e0e0e1")(props),
    },

    input: {
      backgroundColor: mode("#fff !important")(props),
      borderColor: mode("#cbd5e0 !important")(props),
      "::placeholder": {
        color: mode("black", "#ffff")(props),
      },
    },
  }),
};

const components = {
  Button: {
    variants: {
      solid: (props) => ({
        bg: mode("cyan.800")(props),
        color: mode("white")(props),
        _hover: {
          bg: mode("cyan.900")(props),
        },
        _active: {
          bg: mode("cyan.900")(props),
        },
      }),
      mode: (props) => ({
        bg: "transparent",
        _hover: {
          bg: mode("blackAlpha.300", "whiteAlpha.500")(props),
        },
      }),
    },
    defaultProps: {
      variant: "solid",
    },
  },
  Heading: headingTheme,
};

const theme = extendTheme({
  config,
  styles,
  components,
});

export default theme;
