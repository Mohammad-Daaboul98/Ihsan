import {
  Box,
  Button,
  Checkbox,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { studentInput } from "../utils/formFields";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { useState } from "react";

const StudentForm = ({
  title,
  btnTitle,
  errorMessage,
  defaultValue = "",
  teachers,
  disable = false,
  checkBox,
}) => {
  const [disableInput, setDisableInput] = useState({
    userName: disable,
    password: disable,
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
      {title ? (
        <Heading mb={"50px"} textAlign="center">
          {title}
        </Heading>
      ):'koko'}

      {errorMessage ? (
        <Text fontSize="md" color="tomato" py="25px">
          {errorMessage}
        </Text>
      ) : null}

      <Form method="post">
        {checkBox ? (
          <Box display="flex" gap="20px" m="30px 0">
            <Checkbox
              onChange={() =>
                setDisableInput((preVal) => ({
                  ...preVal,
                  userName: !disableInput.userName,
                }))
              }
            >
              اسم المستخدم
            </Checkbox>
            <Checkbox
              onChange={() =>
                setDisableInput((preVal) => ({
                  ...preVal,
                  password: !disableInput.password,
                }))
              }
            >
              كلمة السر
            </Checkbox>
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
              } else {
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
                    disable={disable}
                    PlacementTop={true}
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
