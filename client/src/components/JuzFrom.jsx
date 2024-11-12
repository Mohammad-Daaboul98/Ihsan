import { Box, Button } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import FormRowSelect from "./FormRowSelect";

const JuzForm = ({
  juzList,
  newJuzList,
  EditJuz,
  juzTitle,
  juzLabel,
  btnTitle,
  listItem
}) => {
  return (
    <Box>
      <Form method="post">
        <Box
          display="flex"
          alignItems="center"
          gap="15px"
          flexWrap={{ lg: "nowrap", md: "nowrap", sm: "wrap", base: "wrap" }}
        >
          <FormRowSelect name={juzTitle} labelText={juzLabel} list={juzList} listItem ={listItem} />

          {EditJuz ? (
            <FormRowSelect
              name={"newJuz"}
              labelText={"الجزء الجديد"}
              list={newJuzList}
            />
          ) : null}
        </Box>
        <Button type="submit" mt={"15px"} colorScheme="teal">
          {btnTitle}
        </Button>
      </Form>
    </Box>
  );
};

export default JuzForm;
