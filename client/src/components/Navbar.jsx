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
import useRootStyles from "../theme/useRootStyles";
// import sidebarBg from '../assets/bg1.jpg';

const Navbar = ({
  sidebarProps: { toggled, collapsed, setToggled, showSidebar },
}) => {
  const bg = useColorModeValue("#fcfdfe", "#1a202c");
  const color = useColorModeValue("black", "#e0e0e1");
  const rootStyle = useRootStyles();
  return (
    <Flex h={{md:'100%' ,base:'auto'}} bg={bg} color={color}>
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
            <MenuItem rootStyles={rootStyle} onClick={showSidebar}>
              <Flex justifyContent="center" alignItems="center" pt='10px' bg='gray.800' >
                <Button w='100%' fontSize='20px'>
                  {!collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
                </Button>
              </Flex>
            </MenuItem>
          </Menu>
        ) : null}

        {/* Content */}
        <NavLinks  />
        {/* Footer */}
        {/* <div style={{ textAlign: "center", padding: "16px" }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: "pointer" }}
            to="/profile"
          >
            <FaUser />
            <span>My Account</span>
          </Link>
        </div> */}
      </Sidebar>
    </Flex>
  );
};

export default Navbar;
