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
      bg: mode("#f8fafc", "gray.800")(props),
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
  Table: {
    baseStyle: (props) => ({
      table: {
        borderCollapse: "collapse",
        width: "100%",
        borderRadius: "md",
        overflowX: "auto", // Enable horizontal scroll for responsiveness
        boxShadow: mode("lg", "dark-lg")(props),
      },
      caption: {
        bg: mode("#edf2f6", "#2d3748")(props),
      },
      thead: {
        bg: mode("blue.600", "blue.700")(props),
        color: "white",
      },
      th: {
        fontWeight: "bold",
        textAlign: "center",
        padding: "12px",
        borderBottom: "2px solid",
        borderBottomColor: mode("gray.200", "gray.600")(props),
        color: mode("#000", "#fff")(props),
        whiteSpace: "nowrap", // Prevent headers from breaking into multiple lines
      },
      tbody: {
        borderTop: "1px solid",
        borderTopColor: mode("gray.200", "gray.600")(props),
      },
      tr: {
        _even: {
          bg: mode("gray.100", "gray.700")(props),
        },
        _odd: {
          bg: mode("white", "gray.800")(props),
        },
        _hover: {
          bg: mode("gray.200", "gray.600")(props),
        },
      },
      td: {
        textAlign: "center",
        padding: "12px",
        borderBottom: "1px solid",
        borderBottomColor: mode("gray.200", "gray.600")(props),
        whiteSpace: "nowrap", // Prevent cell contents from breaking into multiple lines
      },
    }),
  },
};


const theme = extendTheme({
  config,
  styles,
  components,
});

export default theme;
