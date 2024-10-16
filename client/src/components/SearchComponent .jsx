import FormRow from "./FormRow";
import { Form, useSubmit } from "react-router-dom";
import useDebounce from "../hooks/useDebounce"; // Adjust the import path as needed
import { Box } from "@chakra-ui/react";

const SearchComponent = ({ labelText }) => {
  const submit = useSubmit();

  const debouncedSubmit = useDebounce((form) => submit(form), 1000);

  const handleSearch = (e) => {
    const form = e.currentTarget.form;
    debouncedSubmit(form);
  };

  return (
    <Box
      p="20px"
      m="50px"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="xl"
      width={{ base: "90%", md: "80%", lg: "xl", xl: "2xl", "2xl": "4xl" }}
      mx="auto"
    >
      <Form>
        <FormRow
          type="text"
          id="search"
          name="search"
          onChange={handleSearch}
          labelText={labelText}
          isRequired="no"
        />
      </Form>
    </Box>
  );
};

export default SearchComponent;
