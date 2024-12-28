import React from "react";
import { Form } from "react-router-dom";
import FormRow from "./FormRow";
import { Button } from "@chakra-ui/react";

const FormComponents = ({
  btnTitle,
  id,
  type,
  labelText,
  max,
  placeholder,
  onInvalid
}) => {
  return (
    <Form method="post">
      <FormRow
        type={type}
        name={id}
        id={id}
        labelText={labelText}
        placeholder={placeholder}
        max={max}
        onInvalid={onInvalid}
      />
      <Button type="submit" colorScheme="teal">
        {btnTitle}
      </Button>
    </Form>
  );
};

export default FormComponents;
