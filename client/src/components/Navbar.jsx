import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import NavLinks from "./NavLinks";
// import sidebarBg from '../assets/bg1.jpg';

const Navbar = ({
  sidebarProps: { toggled, collapsed, setToggled, showSidebar },
}) => {
  const bg = useColorModeValue("#fcfdfe", "gray.800");
  const color = useColorModeValue("black", "#e0e0e1");

  return (
    <Flex h="100vh" bg={bg} color={color}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="md"
        rtl="rtl"
        backgroundColor={bg} 
        color={color} 
      >
        {/* Header */}
        {!toggled ? (
          <Menu>
            <MenuItem
            
              icon={collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
              onClick={showSidebar}
            >
              {!collapsed && <Button onClick={showSidebar}>Pro Sidebar</Button>}
            </MenuItem>
          </Menu>
        ) : null}

        {/* Content */}
        <NavLinks />
        {/* Footer */}
        <div style={{ textAlign: "center", padding: "16px" }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: "pointer" }}
            to="/profile"
          >
            <FaUser />
            <span>My Account</span>
          </Link>
        </div>
      </Sidebar>
    </Flex>
  );
};

export default Navbar;
