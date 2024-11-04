import { Box, Input, useRadio } from "@chakra-ui/react";

const RadioCard = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" display="inline-block" mx="10px">
      <Input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"  
        _checked={{
          bg: props.children === "غائب" ? "red.600" : "teal.600",
          color: "white",
          borderColor: "transparent",
        }}
        _focus={{
          boxShadow: "none",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
