import React from "react";
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
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  EditIcon,
  DeleteIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";

const TableComponent = ({ title, columns, data }) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  // State for sorting
  const [sorting, setSorting] = React.useState([]);

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
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
      >
        <Table variant="unstyled">
          <TableCaption
            placement="top"
            fontSize="lg"
            fontWeight="bold"
            m="0"
            p="20px 10px"
            mb="10px"
            borderBottom="1px solid #000"
          >
            {title}
          </TableCaption>
          <Thead bg="blue.600" color="white">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    isNumeric={header.column.columnDef.isNumeric}
                    cursor="pointer"
                    onClick={() => {
                      const currentSorting = table
                        .getState()
                        .sorting.find((s) => s.id === header.id);
                      const newSorting = currentSorting
                        ? [
                            {
                              id: header.id,
                              desc: !currentSorting.desc,
                            },
                          ]
                        : [
                            {
                              id: header.id,
                              desc: false,
                            },
                          ];
                      setSorting(newSorting);
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {table
                      .getState()
                      .sorting.find((s) => s.id === header.id) ? (
                      table.getState().sorting.find((s) => s.id === header.id)
                        .desc ? (
                        <ChevronDownIcon boxSize={5} />
                      ) : (
                        <ChevronUpIcon boxSize={5} />
                      )
                    ) : null}
                  </Th>
                ))}
                <Th>تعديل أو حذف</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      isNumeric={cell.column.columnDef.isNumeric}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      variant="outline"
                      colorScheme="blue"
                      size={buttonSize}
                      ml="10px"
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      variant="outline"
                      colorScheme="red"
                      size={buttonSize}
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length + 1} textAlign="center">
                  No data available.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>

        {/* Pagination Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p="2"
          mt="2"
        >
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Box flex="1" textAlign="center">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Box>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
