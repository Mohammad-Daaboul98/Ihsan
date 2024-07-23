import { Link, useRouteError } from "react-router-dom";
import { Box, Container, Heading, Text, VStack, Center } from "@chakra-ui/react";
import Image404 from '../assets/image/Image404.gif';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Box bg="white" h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="container.md">
          <Center>
            <VStack spacing={4} w="100%" textAlign="center">
              <Box
                bgImage={`url(${Image404})`}
                bgPos="center"
                bgSize="cover"
                h="400px"
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Heading as="h1" fontSize="80px">
                 404
                </Heading>
              </Box>

              <Box mt={-12}>
                <Heading  as="h3" fontSize="30px" mb='10px'>
                  يبدو أنك تائه
                </Heading>
                <Text fontSize='20px'>! الصفحة التي تبحث عنها غير متوفرة</Text>
                <Link
                  to="/"
                  style={{
                    backgroundColor: '#39ac31',
                    color: 'white',
                    padding: '10px 20px',
                    marginTop: '20px',
                    display: 'inline-block',
                    textDecoration: 'none',
                  }}
                  _hover={{ backgroundColor: '#2e8b2d' }}
                >
                  العودة الى الصفحة الرئيسية
                </Link>
              </Box>
            </VStack>
          </Center>
        </Container>
      </Box>
    );
  }

  return <div>خطأ</div>;
};

export default Error;
