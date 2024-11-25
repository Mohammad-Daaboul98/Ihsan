import { Badge, Box, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelectStyles } from "../theme/components/selectStyle";

const animatedComponents = makeAnimated();

const FormRowSelect = ({
  name,
  labelText,
  list = [],
  listItem,
  secondaryListItem,
  onChange,
  placeholder = "اختر الخيار",
  PlacementTop,
  disable,
  isRange = false,
  value,
  selectParams,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value || null);
  const customStyles = useSelectStyles();

  const CustomOption = ({ label, studentCount }) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Text fontWeight="bold" color="white">
        {label}
      </Text>
      <Badge colorScheme={"blue"} borderRadius="full" px="2">
        {studentCount} طلاب
      </Badge>
    </Box>
  );

  useEffect(() => {
    const formattedOptions = list.map((item) => ({
      value: selectParams
        ? item[listItem]
        : item._id || item.id || item[listItem] || item,
      label: secondaryListItem ? (
        <CustomOption
          label={item[listItem]}
          studentCount={item[secondaryListItem]}
        />
      ) : listItem ? (
        item[listItem]
      ) : (
        item
      ),
    }));
    setOptions(formattedOptions);
  }, [list, listItem, secondaryListItem]);

  const handleChange = (e) => {
    const selected = e.label;

    setSelectedValue(e);
    onChange && onChange(selected ? selected : null);
  };

  return (
    <FormControl>
      <FormLabel htmlFor={name} mb={2} fontWeight="bold">
        {labelText || name}
      </FormLabel>
      <Box
        display="flex"
        flexDirection={isRange ? "row" : "column"}
        gap={isRange ? 4 : 0}
      >
        <Select
          menuPlacement={PlacementTop ? "top" : "bottom"}
          styles={customStyles}
          components={animatedComponents}
          isMulti={false}
          name={isRange ? `${name}From` : name}
          id={isRange ? `${name}From` : name}
          onChange={(e) => handleChange(e)}
          placeholder={isRange ? "من" : placeholder}
          options={options}
          value={selectedValue}
          menuPortalTarget={document.body}
          isDisabled={disable ? disable[listItem] : false}
          isClearable
        />
        {isRange && (
          <Select
            menuPlacement={PlacementTop ? "top" : "bottom"}
            styles={customStyles}
            components={animatedComponents}
            isMulti={false}
            name={isRange ? `${name}To` : name}
            id={isRange ? `${name}To` : name}
            placeholder={"إلى"}
            options={options}
            menuPortalTarget={document.body}
            isDisabled={disable ? disable[name] : false}
          />
        )}
      </Box>
    </FormControl>
  );
};

export default FormRowSelect;
