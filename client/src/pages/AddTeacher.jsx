import React from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { FormRow } from "../components";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";
import { teacherInput } from "../utils/formFields ";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const role = "teacher";
    try {
      const teacher = await customFetch.post("teacher", { ...data, role });
      const teacherData = teacher?.data?.user;
      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم انشاء استاذ جديد", { theme: "colored" });
      const newTeacherData = [
        {
          "اسم المستخدم": teacherData?.userName,
          "كلمة السر": data.password,
          "اسم الاستاذ": data.teacherName,
          "عمل الاستاذ": data.teacherWork,
          "المستوى العلمي": data.teacherStudy,
          "عمر الاستاذ": data.age,
          "رقم الهاتق": data.teacherPhone,
        },
      ];
      await createOrUpdateExcelFile("ملف حسابات الاساتذه", newTeacherData);

      return redirect("../teachers");
    } catch (error) {
      console.error('Error:', error);
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
          spacing={{ md: "10px 20px", base: "10px" }}
        >
          {teacherInput.map(({ type, id, labelText }) => (
            <FormRow
              key={id}
              type={type}
              name={id}
              id={id}
              labelText={labelText}
            />
          ))}
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
