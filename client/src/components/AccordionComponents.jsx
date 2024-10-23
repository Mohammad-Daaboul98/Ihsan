import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const AccordionComponents = ({ items, defaultIndex }) => {
  return (
    <Accordion
      allowMultiple
      defaultIndex={[defaultIndex]}
      border="1px solid #2D3748"
      borderRadius="10px"
      padding="20px"
    >
      {items.map((value, index) => (
        <AccordionItem
          key={index}
        >
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="right" fontSize="24px">
                {value.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} >{value.component}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponents;
