import { Menu, menuClasses, MenuItem, SubMenu } from "react-pro-sidebar";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

function NavLinks() {
  const subMenuBg = useColorModeValue("#fcfdfe", "#1a202c");
  const subMenuHoverBg = useColorModeValue("#e0e0e1 !important", "black !important");
  const subMenuColor = useColorModeValue("black", "#e0e0e1");

  return (
    <Menu>
      {links.map((link) => {
        const { text, submenu } = link;
        return (
          <SubMenu
            key={text}
            defaultOpen
            label={text}
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: subMenuBg,
                color: subMenuColor,
                // "&:hover": {
                //   backgroundColor: subMenuHoverBg,
                // },
              },
              ["." + menuClasses.subMenuContent]: {
                backgroundColor: subMenuBg,
                color: subMenuColor,
                "&:hover": {
                  backgroundColor: subMenuHoverBg,
                },
              },
            }}
          >
            {submenu.map((item) => {
              const { subText, subPath } = item;
              return (
                <MenuItem key={subText} component={<NavLink to={subPath} />}>
                  {subText}
                </MenuItem>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
}
export default NavLinks;
