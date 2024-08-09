import {
  Box,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const TableComponent = ({ title, tableHeaderName, tableItem }) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p="4"
      h="100%"
    >
      <TableContainer
        width="100%"
        maxH="60vh"
        // bg='white'
        borderRadius="lg"
        boxShadow="md"
        overflowY="scroll"
        border="1px solid"
        borderColor="gray.600"
      >
        <Table variant="unstyled">
          <TableCaption
            bg="gray.800"
            placement="top"
            fontSize="lg"
            fontWeight="bold"
            m="0"
            p=" 20px 10px"
            mb="10px"
            borderBottom="1px solid #000"
          >
            {title}
          </TableCaption>
          <Thead bg="blue.600" color="white">
            <Tr>
              {tableHeaderName.map((name, index) => (
                <Th key={index}>{name}</Th>
              ))}
              <Th>تعديل او حذف</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableItem.map((item, index) => (
              <Tr key={index} transition="background-color 0.3s">
                {item.map((value, index) => (
                  <Td key={index}>{value}</Td>
                ))}
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    variant="outline"
                    colorScheme="blue"
                    size={buttonSize}
                    mr={2}
                    _hover={{ bg: "blue.100" }}
                    borderRadius="full"
                    boxShadow="md"
                    // onClick={() => handleEdit(teacher)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    variant="outline"
                    colorScheme="red"
                    size={buttonSize}
                    _hover={{ bg: "red.100" }}
                    borderRadius="full"
                    boxShadow="md"
                    // onClick={() => handleDelete(teacher)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
