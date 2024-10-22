import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import generator from "generate-password-browser";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

function FormRow({
  name,
  type,
  id,
  labelText,
  defaultValue,
  defaultKey,
  onChange,
  isRequired,
  btnPassword,
  disable,
}) {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

  let randomPassword = generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: false,
    lowercase: true,
  });

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
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            pl="6rem"
            disabled={disable ? disable.password : false}
          />
          <InputRightElement
            right="unset"
            left={0}
            display="flex"
            gap="2px"
            justifyContent="flex-start"
            width={btnPassword ? "6rem" : "auto"}
          >
            <Button
              h="100%"
              size="md"
              onClick={() => setShow(!show)}
              isDisabled={disable ? disable.password : false}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
            {btnPassword ? (
              <Button
                h="100%"
                size="md"
                onClick={() => setPassword(randomPassword)}
                isDisabled={disable ? disable.password : false}
              >
                <Icon as={GiPerspectiveDiceSixFacesRandom} />
              </Button>
            ) : null}
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          id={id}
          type={type}
          name={name}
          placeholder={labelText}
          defaultValue={defaultKey ? defaultValue[defaultKey] : defaultValue}
          size="lg"
          textAlign="right"
          onChange={onChange}
          disabled={disable ? disable.userName : false}
        />
      )}
    </FormControl>
  );
}

export default FormRow;
