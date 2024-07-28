import { useColorModeValue } from "@chakra-ui/react";
import { menuClasses } from "react-pro-sidebar";

const useRootStyles = (menuTheme = {}) => {
  const { menuDarkBg, menuHoverDarkBg } = menuTheme;

  const subMenuBg = useColorModeValue(
    "#fcfdfe",
    menuDarkBg ? menuDarkBg : "#1a202c"
  );
  const subMenuColor = useColorModeValue("black", "#e0e0e1");
  const subMenuHoverBg = useColorModeValue(
    "#e0e0e1 !important",
    menuHoverDarkBg ? menuHoverDarkBg : "#171923 !important"
  );

  return {
    ["." + menuClasses.button]: {
      backgroundColor: subMenuBg,
      color: subMenuColor,
      "&:hover": {
        backgroundColor: subMenuHoverBg,
      },
    },
  };
};

export default useRootStyles;
