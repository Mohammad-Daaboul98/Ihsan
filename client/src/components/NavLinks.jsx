import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import useRootStyles from "../theme/useRootStyles";
import DownloadButton from "./DownloadButton";
import { LiaFileDownloadSolid } from "react-icons/lia";
import Links from "./Links";

function NavLinks({ setToggled }) {
  const menuTheme = {
    menuDarkBg: "#4A5568",
    menuHoverDarkBg: "#1A202C !important",
  };

  const rootStyle = useRootStyles();
  const menuRootStyle = useRootStyles(menuTheme);

  return (
    <Menu>
      {/* <MenuItem 
        component={<NavLink to={"/stats"} end />}
        rootStyles={menuRootStyle}
      >
        ملعومات الاساتذه والطلاب
      </MenuItem> */}
      {Links.map((link) => {
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
                  onClick={() => setToggled(false)}
                >
                  {subText}
                </MenuItem>
              );
            })}
          </SubMenu>
        );
      })}
      {/* <SubMenu
        label="تنزيل الملفات"
        icon={<LiaFileDownloadSolid />}
        rootStyles={rootStyle}
      >
        <MenuItem rootStyles={menuRootStyle}>
          <DownloadButton filename="ملف حسابات الأساتذه" exclName="ملف الاساتذه" />
        </MenuItem>
        <MenuItem rootStyles={menuRootStyle}>
          <DownloadButton filename="ملف حسابات الطلاب" exclName="ملف االطلاب" />
        </MenuItem>
      </SubMenu> */}
    </Menu>
  );
}
export default NavLinks;
