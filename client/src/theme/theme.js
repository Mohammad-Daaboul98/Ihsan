import { border, color, extendTheme, Input } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light", // Set initial color mode to 'light' or 'dark'
  useSystemColorMode: false, // Use the user's system preference
};

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "'Tajawal', sans-serif",
      margin: 0,
      bg: mode("#fff", "gray.800")(props),
      color: mode("#646464", "#e0e0e1")(props),
    },

    input: {
    //   backgroundColor: mode("red !important", "#ffff !important")(props),
      "::placeholder": {
        // color: mode("red", "#ffff")(props),
      },
    },
  }),
};

const theme = extendTheme({
  config,
  styles,
});

export default theme;
