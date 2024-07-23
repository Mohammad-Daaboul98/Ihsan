import React from "react";
import { FormRow, Header } from "../components";
import { Box, Button, Container } from "@chakra-ui/react";
import { Form } from "react-router-dom";


const Login = () => {
  return (
    <Box h="100vh" max={"full"}>
      <Header />
      <Box h="100%" display="flex" justifyContent="center" alignItems="center">
        <Container maxW="container.md">
          <Form>
            <FormRow type="text" id="userName" labelText="اسم المستخدم" />
            <FormRow type="password" id="password" labelText="كلمة السر" />
            <Button type="submit">تسجيل الدخول</Button>
          </Form>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
