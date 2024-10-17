import { Box } from "@chakra-ui/react";
import { CardComponents } from "../components";
import { MdCoPresent } from "react-icons/md";

const studentProfile = () => {
  return (
    <Box>
      <CardComponents
        title="أيام الحضور"
        value={5}
        logo={<MdCoPresent size="24px" color="white" />}
      />
    </Box>
  );
};

export default studentProfile;
