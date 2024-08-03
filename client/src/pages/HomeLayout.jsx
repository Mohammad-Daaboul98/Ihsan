import { useColorMode } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";


const HomeLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const pageMode = {
    colorMode,
    toggleColorMode,
  };

  return (
    <>
      <Outlet context={{ pageMode }} />
    </>
  );
};

export default HomeLayout;
