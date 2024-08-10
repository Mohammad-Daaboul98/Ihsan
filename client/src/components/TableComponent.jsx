import { useState } from "react";
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
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

const TableComponent = ({
  title,
  columns,
  data,
  // onEdit,
  // onDelete,
  editIcon = <EditIcon />,
  deleteIcon = <DeleteIcon />,
  actionsLabel = "Actions",
  tableStyles = {},
  containerStyles = {},
  captionStyles = {},
}) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  

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
        borderRadius="lg"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.600"
        {...containerStyles}
      >
        <Table variant="unstyled" {...tableStyles}>
          <TableCaption
            bg="gray.800"
            placement="top"
            fontSize="lg"
            fontWeight="bold"
            m="0"
            p="20px 10px"
            mb="10px"
            borderBottom="1px solid #000"
            {...captionStyles}
          >
            {title}
          </TableCaption>
          <Thead bg="blue.600" color="white">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={header.column.columnDef.isNumeric}
                    cursor='pointer'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </Th>
                ))}
                <Th>{actionsLabel}</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id} transition="background-color 0.3s">
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} isNumeric={cell.column.columnDef.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={editIcon}
                    variant="outline"
                    colorScheme="blue"
                    size={buttonSize}
                    mr={2}
                    _hover={{ bg: "blue.100" }}
                    borderRadius="full"
                    boxShadow="md"
                    // onClick={() => onEdit && onEdit(row.original)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={deleteIcon}
                    variant="outline"
                    colorScheme="red"
                    size={buttonSize}
                    _hover={{ bg: "red.100" }}
                    borderRadius="full"
                    boxShadow="md"
                    // onClick={() => onDelete && onDelete(row.original)}
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
