import React from "react";
import {
  Button,
  Box,
  Flex,
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  //useDisclosure,
} from "@chakra-ui/react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import FilterTable from "./FilterTable";

const TableWithPagination = ({ columns, data, handleAdd, labelBtn }) => {
  
  //Propiedades para los colores ligh/dark
  let bgBoxes = useColorModeValue("white", "gray.700");
  let bgRowHighlight = useColorModeValue("gray.50", "gray.800");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    //preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      {/** HEADER*/}
      <Flex align={"center"} bg={bgBoxes} pt={4} pb={6} px={4} borderRadius={"0 0 15px 15px"}>
        {/**BUTTON ADD */}
        <Button
          onClick={() => handleAdd()}
          mr={{ base: 2, md: 4 }}
          colorScheme="teal"
        >
          Crear {labelBtn}
        </Button>
        {/**INPUT SEARCH */}
        <Box bg={bgBoxes} borderRadius={"20px"} w={"full"}>
          <FilterTable
            //preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Box>
      </Flex>
      <TableContainer borderRadius={"15px 15px 0 0"} mt={4} bg={bgBoxes} p={4}>
        <Table {...getTableProps()} p={2}>
          <Thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <Th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon />
                          ) : (
                            <TriangleUpIcon />
                          )
                        ) : (
                          ""
                        )}
                      </Th>
                    ))
                  }
                </Tr>
              ))
            }
          </Thead>
          {/* Apply the table body props */}
          <Tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              page.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <Tr
                    {...row.getRowProps()}
                    cursor={"pointer"}
                    _hover={{ bg: bgRowHighlight }}
                  >
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <Td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </Td>
                        );
                      })
                    }
                  </Tr>
                );
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        justify={"end"}
        align={"center"}
        bg={bgBoxes}
        borderRadius={"0 0 15px 15px"}
      >
        <Text mr={2}>
          Página&nbsp;
          <strong>
            {pageIndex + 1} <span style={{ fontWeight: "normal" }}>de</span>{" "}
            {pageOptions.length}
          </strong>
        </Text>
        <HStack spacing={1}>
          <Button
            variant={"ghost"}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <BiFirstPage className="page-controller" />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <MdKeyboardArrowLeft className="page-controller" />
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <MdKeyboardArrowRight className="page-controller" />
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            variant={"ghost"}
          >
            <BiLastPage className="page-controller" />
          </Button>
        </HStack>
        <Select
          variant={"unstyled"}
          w={"120px"}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize !== 15 ? `Mostrar ${pageSize}` : `Mostrar todo`}
            </option>
          ))}
        </Select>
      </Flex>
    </>
  );
};

export default TableWithPagination;
