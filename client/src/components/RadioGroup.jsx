// RadioGroup Component
import { Box, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import { STUDENT_ATTENDANCE } from "../../../server/shared/constants";

const RadioGroup = ({ studentsAttendance, currentAttendance }) => {
  
  
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "attendance",
    value: currentAttendance, // Control the selected value
    onChange: (value) => studentsAttendance(value), // Ensure immediate update
  });

  const options = STUDENT_ATTENDANCE;
  const group = getRootProps();
  
  return (
    <Box display='flex' gap='0 10px' {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </Box>
  );
};

export default RadioGroup;
