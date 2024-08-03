import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { FormRow } from "../components";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const role = "teacher";
    try {
      const teacherData = await customFetch.post("teacher", { ...data, role });
      queryClient.invalidateQueries(["teacher"]);
      toast.success("تم انشاء استاذ جديد", { theme: "colored" });
      const newTeacherData = [
        {
          "اسم المستخدم": teacherData?.data?.user?.userName,
          "كلمة السر": data.password,
        },
      ];
      createOrUpdateExcelFile("ملف حسابات الاساتذه", newTeacherData);
      return redirect("../");
    } catch (error) {
      return error;
    }
  };

const AddTeacher = () => {
  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;
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
        انشاء استاذ
      </Heading>

      {errorMessage ? (
        <Text fontSize="md" color="tomato" py="25px">
          {errorMessage}
        </Text>
      ) : null}

      <Form method="post">
        <SimpleGrid
          columns={{ lg: 2, md: 2, sm: 2, base: 1 }}
          spacing={{ md: "15px 30px", sm: "10px 20px", base: "10px" }}
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
          <FormRow type="date" name="age" id="age" labelText="عمر الاستاذ" />
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
          انشاء
        </Button>
      </Form>
    </Box>
  );
};

export default AddTeacher;
