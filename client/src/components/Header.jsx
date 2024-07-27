import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ihsanIconDark from "../assets/image/iconDark.svg";
import ihsanIconLight from "../assets/image/iconLight.svg";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="full" padding={{ base: "10px 15px", md: "10px 50px" }}>
      <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Flex alignItems="center" gap="25px">
          {colorMode === "light" ? (
            <Image
              src={ihsanIconDark}
              alt="Ihsan-icon"
              width={{ base: "40px", md: "75px" }}
            />
          ) : (
            <Image
              src={ihsanIconLight}
              alt="Ihsan-icon"
              width={{ base: "40px", md: "75px" }}
            />
          )}
          <Heading
            as="h1"
            variant="logo"
            fontFamily="'Reem Kufi Fun', serif"
            fontSize={{ base: "35px", md: "50px" }}
          >
            اِحسان
          </Heading>
        </Flex>

        <Button
          variant='mode'
          padding={0}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <MoonIcon boxSize={{ base:  5, md: 6 }} color="#234e52" />
          ) : (
            <SunIcon boxSize={{ base: 5, md: 6 }} color="orange" />
          )}
        </Button>
      </Flex>
    </Container>
  );
};

export default Header;
