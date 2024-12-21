import { Sidebar } from "react-pro-sidebar";
import {
  Box,
  Button,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import NavLinks from "./NavLinks";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({
  sidebarProps: { toggled, collapsed, setToggled, logoutUser },
  role,
}) => {
  const bg = useColorModeValue("#EDF2F7", "#2D3748");
  const color = useColorModeValue("black", "#e0e0e1");

  return (
    <Flex
      h={{ lg: "100vh", md: "auto", base: "auto" }}
      bg={bg}
      color={color}
      borderColor="transparent"
      px={"25px"}
      boxShadow="lg"
      position="sticky"
      top="0"
      zIndex="1"
    >
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="lg"
        rtl="rtl"
        backgroundColor={bg}
        color={color}
        rootStyles={{
          borderColor: "transparent",
          ["div"]: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Heading
            as="h1"
            variant="logo"
            fontFamily="'Reem Kufi Fun', serif"
            fontSize={
              !collapsed ? { base: "20px", sm: "20px", md: "45px" } : "32px"
            }
            transition="all .5s ease-out"
            p="20px 0 50px"
          >
            اِحسان
          </Heading>
        </Flex>
        <NavLinks setToggled={setToggled} role={role} />
        <Box marginTop="auto" p="20px 10px">
          <Button onClick={() => logoutUser()}>
            {collapsed ? <IoLogOutOutline /> : "تسجيل الخروج"}
          </Button>
        </Box>
      </Sidebar>
    </Flex>
  );
};

export default Navbar;
