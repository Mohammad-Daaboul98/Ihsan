import React from "react";
import { Form } from "react-router-dom";
import { FormRow } from "../components";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";

const AddTeacher = () => {
  return (
    <Box
      padding={{
        md: "25px 50px",
        sm: "20px",
        base: "20px 10px",
      }}
      m={"auto"}
      boxShadow="lg"
      borderRadius="md"
    >
      <Heading mb={"50px"} textAlign="center">
        استمارة التسجيل
      </Heading>
      <Form method="post">
        <SimpleGrid
          columns={{ lg: 2, md: 2, sm: 2, base: 1 }}
          spacing={{md:"15px 30px" , sm:"10px 20px",base:"10px"}}
        >
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
            labelText="كلمة المرور"
          />
          <FormRow type="date" name="date" id="date" labelText="عمر الاستاذ" />
          <FormRow
            type="text"
            name="teacherName"
            id="teacherName"
            labelText="اسم الاستاذ"
          />
          <FormRow
            type="text"
            name="teacherWork"
            id="teacherWork"
            labelText="عمل الاستاذ"
          />
          <FormRow
            type="text"
            name="teacherStudy"
            id="teacherStudy"
            labelText="المستوى العلمي"
          />
          <FormRow
            type="text"
            name="teacherPhone"
            id="teacherPhone"
            labelText="رقم الهاتق"
          />
        </SimpleGrid>
        <Button
          mt="15px"
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
        >
          تسجيل
        </Button>
      </Form>
    </Box>
  );
};

export default AddTeacher;
