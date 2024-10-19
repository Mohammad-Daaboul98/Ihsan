import { useColorModeValue } from "@chakra-ui/react";
import { menuClasses } from "react-pro-sidebar";

const useRootStyles = (menuTheme = {}) => {
  const { menuDarkBg, menuHoverDarkBg } = menuTheme;

  const subMenuBg = useColorModeValue(
    "#EDF2F7",
    menuDarkBg ? menuDarkBg : "#2D3748"
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
      fontSize:'18px',
      padding:'0 25px',
      overflowWrap:'break-word',
      wordBreak: 'break-all',

      "&:hover": {
        backgroundColor: subMenuHoverBg,
      },
    },
  };
};

export default useRootStyles;
