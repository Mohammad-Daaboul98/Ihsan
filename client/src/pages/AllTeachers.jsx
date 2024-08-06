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
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const allTeachersQuery = (params) => {
  return {
    queryKey: ["teachers", params],
    queryFn: async () => {
      const { data } = await customFetch.get("/teacher", {
        params,
      });
      return data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      await queryClient.ensureQueryData(allTeachersQuery(params));
      return { searchValue: { ...params } };
    } catch (error) {
      const errorMessage = error?.response?.data?.msg;
      toast.error(errorMessage);
      return error;
    }
  };
const AllTeachers = () => {
  const { searchValue } = useLoaderData();
  const {
    data: { teachers },
  } = useQuery(allTeachersQuery(searchValue));
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
            Teachers Information
          </TableCaption>
          <Thead bg="blue.600" color="white">
            <Tr>
              <Th>اسم الاستاذ</Th>
              <Th>عمل الاستاذ</Th>
              <Th>المستوى العلمي</Th>
              <Th>رقم الهاتق</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teachers.map((teacher, index) => (
              <Tr key={index} transition="background-color 0.3s">
                <Td>{teacher.teacherName}</Td>
                <Td>{teacher.teacherWork}</Td>
                <Td>{teacher.teacherStudy}</Td>
                <Td>{teacher.teacherPhone}</Td>
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
                    onClick={() => handleEdit(teacher)}
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
                    onClick={() => handleDelete(teacher)}
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

export default AllTeachers;
