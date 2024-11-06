import {
  Box,
  Button,
  Checkbox,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { StudentCheckBox, studentInput } from "../utils/formFields";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const StudentForm = ({
  title,
  btnTitle,
  errorMessage,
  defaultValue = "",
  teachers,
  disable = false,
  checkBox,
  isLoading,
  removeJuz = false,
}) => {
  const [disableInput, setDisableInput] = useState({
    userName: disable,
    password: disable,
    teacherName: disable,
  });

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
      {title && (
        <Heading mb={"50px"} textAlign="center">
          {title}
        </Heading>
      )}

      {errorMessage ? (
        <Text fontSize="md" color="tomato" py="25px">
          {errorMessage}
        </Text>
      ) : null}

      <Form method="post">
        {checkBox ? (
          <Box display="flex" flexWrap="wrap" gap="20px" m="30px 0">
            {StudentCheckBox.map(({ title, listItem }, index) => (
              <Checkbox
                key={index}
                onChange={() =>
                  setDisableInput((preVal) => ({
                    ...preVal,
                    [listItem]: !disableInput[listItem],
                  }))
                }
              >
                {title}
              </Checkbox>
            ))}
          </Box>
        ) : null}

        <SimpleGrid
          columns={{ lg: 2, md: 2, sm: 2, base: 1 }}
          spacing={{ md: "10px 20px", base: "10px" }}
        >
          {studentInput.map(
            ({
              type,
              id,
              labelText,
              list,
              listItem,
              defaultKey,
              btnPassword,
            }) => {
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
                    btnPassword={btnPassword}
                    isRequired={true}
                    disable={
                      id === "userName" || id === "password"
                        ? disableInput
                        : false
                    }
                  />
                );
              } else if (id === "teacherId" || !removeJuz) {
                return (
                  <FormRowSelect
                    key={id}
                    type={type}
                    name={id}
                    labelText={labelText}
                    list={list ? list : teachers}
                    listItem={listItem}
                    defaultValue={defaultValue}
                    defaultKey={defaultKey}
                    PlacementTop={true}
                    disable={disableInput}
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
          isLoading={isLoading}
          spinner={<BeatLoader size={8} color="white" />}
          onClick={(e) => e.preventDefault}
        >
          {btnTitle}
        </Button>
      </Form>
    </Box>
  );
};

export default StudentForm;
