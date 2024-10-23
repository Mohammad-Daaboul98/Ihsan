import { Box, Button } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import FormRowSelect from "./FormRowSelect";
import { QURAN_INDEX } from "../../../server/shared/constants";


const JuzForm = () => {
  return (
    <Box>
      <Form method="post">
        <FormRowSelect
          name={"juzName"}
          labelText={"الجزء"}
          list={QURAN_INDEX.JUZ}
          listItem={"juzName"}
        />
        <Button type="submit" mt={"15px"}   colorScheme="teal">
         اضافة جزء
        </Button>
      </Form>
    </Box>
  );
};

export default JuzForm;
