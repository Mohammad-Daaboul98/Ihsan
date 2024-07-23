import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

function FormRow({ type, id, labelText, defaultValue = "", onChange }) {
  return (
    <FormControl
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      mb={5}
      isRequired
    >
      <FormLabel htmlFor={id} mb={2}>{labelText}</FormLabel>
      <Input
        id={id}
        type={type}
        placeholder={labelText}
        defaultValue={defaultValue}
        outline="none"
        size="lg"
      />
    </FormControl>
  );
}

export default FormRow;
