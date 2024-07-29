import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import useRootStyles from "../theme/useRootStyles";

function NavLinks() {
  const menuTheme = {
    menuDarkBg: "#4A5568",
    menuHoverDarkBg: "#1A202C !important",
  };

  const rootStyle = useRootStyles();
  const menuRootStyle = useRootStyles(menuTheme);
  // const location = useLocation();

  return (
    <Menu>
      {links.map((link) => {
        const { text, submenu, icon } = link;
        {/* const isActiveMenu = submenu.some((item) =>
          location.pathname.includes(item.subPath)
        ); */}
        return (
          <SubMenu
            key={text}
            label={text}
            icon={icon}
            rootStyles={rootStyle}
          >
            {submenu.map((item) => {
              const { subText, subPath } = item;
              return (
                <MenuItem
                  key={subText}
                  component={<NavLink to={subPath} end />}
                  rootStyles={menuRootStyle}
                >
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
