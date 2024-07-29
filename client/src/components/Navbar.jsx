import { Sidebar } from "react-pro-sidebar";
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import NavLinks from "./NavLinks";

const Navbar = ({
  sidebarProps: { toggled, collapsed, setToggled, showSidebar },
}) => {
  const bg = useColorModeValue("#fcfdfe", "#2D3748");
  const color = useColorModeValue("black", "#e0e0e1");
  return (
    <Flex
      h={{ md: "100%", base: "auto" }}
      bg={bg}
      color={color}
      borderColor="transparent"
      px={'25px'}
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
        }}
      >
        <Flex w="100%" justifyContent="center" alignItems="center">
          <Heading
            as="h1"
            variant="logo"
            fontFamily="'Reem Kufi Fun', serif"
            fontSize={{ base: "20px", sm: "20px", md: "35px" }}
            p="20px 0 50px"
          >
            اِحسان
          </Heading>
        </Flex>
        <NavLinks />
      </Sidebar>
    </Flex>
  );
};

export default Navbar;
