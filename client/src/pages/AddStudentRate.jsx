// import { studentInputRate } from '../utils/formFields';

import { Form, useActionData } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { studentInputRate } from "../utils/formFields";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const student = await customFetch.post("student", { ...data });
      queryClient.invalidateQueries(["student"]);
      toast.success("تم حفظ التقيم", { theme: "colored" });
      return redirect("../students");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddStudentRate = () => {
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
      boxShadow="2xl"
      borderRadius="md"
    >
      <Heading mb={"50px"} textAlign="center">
        اضافة تقيم التسميع
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
          {studentInputRate.map(({ type, id, labelText, list, listItem }) => {
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
                  list={list}
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

export default AddStudentRate;
