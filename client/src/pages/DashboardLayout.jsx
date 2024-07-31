import React, { useState } from "react";
import { Navbar } from "../components";
import { Button, Flex, Box } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const showSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleSidebar = () => {
    setCollapsed(false);
    setToggled(true);
  };

  const sidebarProps = {
    toggled,
    collapsed,
    setToggled,
    showSidebar,
  };

  return (
    <Flex>
      <Box minHeight='100vh'   w={{base:"0",md:"0",lg:'auto'}}>
        <Navbar sidebarProps={sidebarProps} />
      </Box>
      <Flex w="100%" flexDirection="column">
        <Box
          position="sticky"
          display="flex"
          alignItems="center"
          p={{lg:"20px 45px" ,md:'10px 20px' ,base :"10px"}}
          bg="gray.700"
          h={{lg:"100px" ,md:'70px', base:'70px'}}
        >
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            fontSize="25px"
            display={{ base: "flex", md: "flex", lg: "none" }}
            onClick={toggleSidebar}
          >
            <FaBars />
          </Button>

          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            display={{ base: "none", md: "none", lg: "flex" }}
            fontSize="25px"
            onClick={showSidebar}
          >
            <FaBars />
          </Button>
        </Box>
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default DashboardLayout;
