import React, { useState } from "react";
import { Navbar } from "../components";
import { Button, HStack } from "@chakra-ui/react";
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
    <HStack alignItems="start">
      <Navbar sidebarProps={sidebarProps} />
      {!toggled ? (
        <Button display={{ lg: "none", md: "flex" }} onClick={toggleSidebar}>
          <FaBars />
        </Button>
      ) : null}

      <Outlet />
    </HStack>
  );
}

export default DashboardLayout;
