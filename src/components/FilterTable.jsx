import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";

const FilterTable = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  //const totalItemsAvailable = preGlobalFilteredRows.length; //cantidad de registros
  const [value, setValue] = useState(globalFilter);

  const onFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  );

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <>
      <InputGroup bg="white">
        <InputLeftElement pointerEvents="none" color="gray.400">
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder="Buscar..."
          variant="outline"
          focusBorderColor="teal.400"
          borderColor={"gray.300"}
          value={value || ""}
          onChange={handleInputChange}
        />
      </InputGroup>
    </>
  );
};

export default FilterTable;
