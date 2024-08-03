import {Form, redirect } from "react-router-dom";
import { FormRow, Header } from "../components";
import { Box, Button, Container } from "@chakra-ui/react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";


export const action = (queryClient) =>
  async ({ request }) => {
    const formDate = await request.formData();
    const data = Object.fromEntries(formDate);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries()
      toast.success('تم تسجيل الدخول',{theme: "colored",})
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg,{theme: "colored",});
      return error;
    }
  };

const Login = () => {
  return (
    <Box h="100vh" display="flex" flexDirection="column" alignItems="center">
      <Header />
      <Box
        m="auto 0"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container maxW="container.xl">
          <Form method="post">
            <FormRow
              type="text"
              name="userName"
              id="userName"
              labelText="اسم المستخدم"
            />
            <FormRow
              type="password"
              name="password"
              id="password"
              labelText="كلمة السر"
            />
            <Button type="submit" w="100%">
              تسجيل الدخول
            </Button>
          </Form>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
