import { Box, Button } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import FormRowSelect from "./FormRowSelect";

const JuzForm = ({ juzName }) => {
  return (
    <Box>
      <Form method="post">
        <FormRowSelect name={"juzName"} labelText={"الجزء"} list={juzName} />
        <Button type="submit" mt={"15px"} colorScheme="teal">
          اضافة جزء
        </Button>
      </Form>
    </Box>
  );
};

export default JuzForm;
