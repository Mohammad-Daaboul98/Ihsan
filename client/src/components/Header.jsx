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
    <Container maxW="full" padding="10px 50px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap="25px">
          {colorMode === "light" ? (
            <Image src={ihsanIconDark} alt="Ihsan-icon" width={75} />
          ) : (
            <Image src={ihsanIconLight} alt="Ihsan-icon" width={75} />
          )}
          <Heading as="h1" fontFamily="'Reem Kufi Fun', serif">
            اِحسان
          </Heading>
        </Flex>

        <Button bg="transparent" _hover={{ bg:'transparent'}} onClick={toggleColorMode}>
          {colorMode === "light" ? (
            <SunIcon boxSize={7} color="orange" />
          ) : (
            <MoonIcon boxSize={7} color="#234e52" />
          )}
        </Button>
      </Flex>
    </Container>
  );
};

export default Header;
