import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Form } from "react-router-dom";
import FormRow from "./FormRow";
import { teacherInput } from "../utils/formFields";

const TeacherFrom = ({ title, btnTitle, errorMessage, defaultValue }) => {
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
          {teacherInput.map(({ type, id, labelText }) => (
            <FormRow
              key={id}
              type={type}
              name={id}
              id={id}
              labelText={labelText}
              defaultValue={defaultValue}
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
          {btnTitle}
        </Button>
      </Form>
    </Box>
  );
};

export default TeacherFrom;
