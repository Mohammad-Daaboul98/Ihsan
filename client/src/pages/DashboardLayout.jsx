import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { Button, Flex, Box, useColorModeValue } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { Outlet, redirect, useOutletContext } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

function DashboardLayout() {
  const [isAuthError, setIsAuthError] = useState(false);

  const {user} = useQuery(userQuery).data;

  const {
    pageMode: { colorMode, toggleColorMode },
  } = useOutletContext();

  const bg = useColorModeValue("#fff", "#2D3748");
  const color = useColorModeValue("black", "#e0e0e1");

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

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
  }, [isAuthError]);

  return (
    <Flex>
      <Box minHeight="100vh" w={{ base: "0", md: "0", lg: "auto" }}>
        <Navbar sidebarProps={sidebarProps} />
      </Box>
      <Flex w="100%" flexDirection="column">
        <Box
          position="sticky"
          top="0"
          display="flex"
          alignItems="center"
          p={{ lg: "20px 45px", md: "10px 20px", base: "10px" }}
          bg={bg}
          h={{ lg: "100px", md: "70px", base: "70px" }}
          zIndex="1"
        >
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <Button
              bg="transparent"
              color={color}
              _hover={{ bg: "transparent" }}
              fontSize="25px"
              display={{ base: "flex", md: "flex", lg: "none" }}
              onClick={toggleSidebar}
            >
              <FaBars />
            </Button>

            <Button
              bg="transparent"
              color={color}
              _hover={{ bg: "transparent" }}
              display={{ base: "none", md: "none", lg: "flex" }}
              fontSize="25px"
              onClick={showSidebar}
            >
              <FaBars />
            </Button>

            <Button variant="mode" padding={0} onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <MoonIcon boxSize={{ base: 5, md: 6 }} color="#234e52" />
              ) : (
                <SunIcon boxSize={{ base: 5, md: 6 }} color="orange" />
              )}
            </Button>
          </Flex>
        </Box>
        <Outlet context={{user}} />
      </Flex>
    </Flex>
  );
}

export default DashboardLayout;
