import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const logo = defineStyle({
  color: "#646464",
  _dark: {
    color: "#e0e0e1",
  },
});

export const headingTheme = defineStyleConfig({
  variants: {
    logo: logo,
  },
});
