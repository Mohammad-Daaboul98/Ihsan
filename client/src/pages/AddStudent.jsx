import { Form, redirect, useActionData } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";
import { studentInput } from "../utils/formFields";
import { useQuery } from "@tanstack/react-query";

const getTeachersQuery = () => {
  return {
    queryKey: ["get-teachers"],
    queryFn: async () => {
      const { data } = await customFetch.get("/teacher");
      return data;
    },
  };
};

export const loader = (queryClient) => async () => {
  try {
    const teachers = await queryClient.ensureQueryData(getTeachersQuery());
    return teachers;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    throw error;
  }
};

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.StudentJuz = [{ juzName: data.StudentJuz }];

    const role = "student";
    try {
      const student = await customFetch.post("student", { ...data, role });
      const studentData = student?.data?.user;
      queryClient.invalidateQueries(["students"]);
      toast.success("تم انشاء طالب جديد", { theme: "colored" });
      const newStudentData = [
        {
          "اسم المستخدم": studentData?.userName,
          "كلمة السر": data.password,
          "اسم الطالب": data.studentName,
          "اسم الأب او الأم": data.parentName,
          "عمل الأب او الأم": data.parentWork,
          "رقم هاتف الأب أو الأم": data.parentPhone,
          "المستوى العلمي": data.StudentStudy,
          "عمر الطالب": data.age,
          "اسم الاستاذ": data.teacherId,
          الجزء: data.StudentJuz,
          // "نقاط الطالب": data.studentPoint,
          // "السورة":data.surahs,
          // "الصفحة":data.pages,
          // "تقيم التسميع":data.rate,
        },
      ];
      await createOrUpdateExcelFile("ملف حسابات الطالب", newStudentData);
      return redirect("../students");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddStudent = () => {
  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;

  const { data: { teachers = [] } = {} } = useQuery(getTeachersQuery());

  return (
    <Box
      padding={{
        md: "25px 50px",
        sm: "20px",
        base: "20px 10px",
      }}
      m={"auto"}
      boxShadow="2xl"
      borderRadius="md"
    >
      <Heading mb={"50px"} textAlign="center">
        انشاء طالب
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
          {studentInput.map(({ type, id, labelText, list, listItem }) => {
            if (type !== "select") {
              return (
                <FormRow
                  key={id}
                  type={type}
                  name={id}
                  id={id}
                  labelText={labelText}
                />
              );
            } else {
              return (
                <FormRowSelect
                  key={id}
                  type={type}
                  name={id}
                  labelText={labelText}
                  list={list ? list : teachers}
                  listItem={listItem}
                />
              );
            }
          })}
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

export default AddStudent;
