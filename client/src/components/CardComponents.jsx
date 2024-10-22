import { Box, Card, CardBody, Heading, Icon } from "@chakra-ui/react";
import  { useEffect, useState } from "react";
import {FaCalendarAlt } from "react-icons/fa";
import { MdDoNotDisturbOn } from "react-icons/md";



const CardComponents = ({ title, value, iconType = "calendar" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 500; 
    const stepTime = Math.abs(Math.floor(duration / end));
    

    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const icon = iconType === "calendar" ? FaCalendarAlt : MdDoNotDisturbOn; 

  return (
    <Card
      bg={"gray.700"}
      boxShadow="0 12px 24px rgba(0, 0, 0, 0.6)"
      borderRadius="25px"
      p="30px"
      width="fit-content"
      m="25px"
      transition="all 0.4s ease-out"
      _hover={{ transform: "scale(1.08)" }}
    >
      <CardBody>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={3}
          mb="15px"
        >
          <Heading as="h5" size="lg" color="gray.50" fontWeight="bold" m={0}>
            {title}
          </Heading>
          <Icon as={icon} boxSize={8} color="gray.300" /> 
        </Box>

        <Box mt="10px" display="flex" justifyContent="center">
          <Heading
            as="h1"
            size="4xl"
            color="gray.50"
            fontWeight="bold"
            lineHeight="1.2"
            textShadow="0px 4px 12px rgba(0, 0, 0, 0.4)"
          >
            {displayValue}
          </Heading>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CardComponents;
