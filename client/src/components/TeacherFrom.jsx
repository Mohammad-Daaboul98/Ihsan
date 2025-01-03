import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Form } from "react-router-dom";
import FormRow from "./FormRow";
import { teacherInput } from "../utils/formFields";
import { BeatLoader } from "react-spinners";

const TeacherFrom = ({
  title,
  btnTitle,
  errorMessage,
  defaultValue,
  isLoading,
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
          {teacherInput.map(
            ({ type, id, labelText, defaultKey, btnPassword, phone }) => (
              <FormRow
                key={id}
                type={type}
                name={id}
                id={id}
                labelText={labelText}
                defaultValue={defaultValue}
                defaultKey={defaultKey}
                btnPassword={btnPassword}
                phone={phone}
              />
            )
          )}
        </SimpleGrid>
        <Button
          mt="15px"
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
        >
          {btnTitle}
        </Button>
      </Form>
    </Box>
  );
};

export default TeacherFrom;
