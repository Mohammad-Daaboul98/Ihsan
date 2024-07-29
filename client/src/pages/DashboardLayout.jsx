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
      <Box h="100vh">
        <Navbar sidebarProps={sidebarProps} />
      </Box>
      <Flex w="100%" flexDirection="column">
        <Box
          position="sticky"
          display="flex"
          alignItems="center"
          p="20px 45px"
          bg="gray.700"
          h="100px"
        >
          <Button
            bg="transparent"
            _hover={{ bg: "transparent" }}
            fontFamily="20px"
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
