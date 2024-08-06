import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import useRootStyles from "../theme/useRootStyles";
import DownloadButton from "./DownloadButton";
import { LiaFileDownloadSolid } from "react-icons/lia";

function NavLinks() {
  const menuTheme = {
    menuDarkBg: "#4A5568",
    menuHoverDarkBg: "#1A202C !important",
  };

  const rootStyle = useRootStyles();
  const menuRootStyle = useRootStyles(menuTheme);

  return (
    <Menu>
      {links.map((link) => {
        const { text, submenu, icon } = link;
        return (
          <SubMenu key={text} label={text} icon={icon} rootStyles={rootStyle}>
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
      <SubMenu
        label="تنزيل الملفات"
        icon={<LiaFileDownloadSolid />}
        rootStyles={rootStyle}
      >
        <MenuItem rootStyles={menuRootStyle}>
          <DownloadButton filename="ملف حسابات الأساتذه" />
        </MenuItem>
        <MenuItem rootStyles={menuRootStyle}>
          <DownloadButton filename="ملف حسابات الطلاب" />
        </MenuItem>
      </SubMenu>
    </Menu>
  );
}
export default NavLinks;
