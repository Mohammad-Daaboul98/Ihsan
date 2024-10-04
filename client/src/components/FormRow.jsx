import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function FormRow({
  name,
  type,
  id,
  labelText,
  defaultValue,
  onChange,
  isRequired,
}) {
  const [show, setShow] = useState(false);

  return (
    <FormControl
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      mb={5}
      isRequired={isRequired ? false : true}
    >
      <FormLabel htmlFor={id} mb={2} fontWeight="bold">
        {labelText}
      </FormLabel>
      {type === "password" ? (
        <InputGroup size="lg">
          <Input
            id={id}
            type={show ? "text" : "password"}
            name={name}
            placeholder={labelText}
            size="lg"
            defaultValue={defaultValue || ''}
          />
          <InputRightElement right="unset" left={0}>
            <Button h="100%" size="lg" onClick={() => setShow(!show)}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          id={id}
          type={type}
          name={name}
          placeholder={labelText}
          defaultValue={defaultValue}
          size="lg"
          textAlign="right"
          onChange={onChange}
        />
      )}
    </FormControl>
  );
}

export default FormRow;
