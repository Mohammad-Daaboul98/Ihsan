import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { studentInput } from "../utils/formFields";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const StudentForm = ({
  title,
  btnTitle,
  errorMessage,
  defaultValue = "",
  teachers,
}) => {
  
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
        {title}
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
          {studentInput.map(
            ({ type, id, labelText, list, listItem, defaultKey }) => {
              if (type !== "select") {
                return (
                  <FormRow
                    key={id}
                    type={type}
                    name={id}
                    id={id}
                    labelText={labelText}
                    defaultValue={defaultValue}
                    defaultKey={defaultKey}
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
            }
          )}
        </SimpleGrid>
        <Button
          mt="15px"
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
        >
          {btnTitle}
        </Button>
      </Form>
    </Box>
  );
};

export default StudentForm;
