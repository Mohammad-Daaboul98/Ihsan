import { Box, FormControl, FormLabel } from "@chakra-ui/react";
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
  onChange,
  placeholder = "اختر الخيار",
  PlacementTop,
  disable,
  isRange = false,
  value, // Add value prop for controlled selection
  restSelect,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(value || null);
  const [rest, setRest] = useState();
  const customStyles = useSelectStyles();

  useEffect(() => {
    const formattedOptions = list.map((item) => ({
      value: item._id || item.id || item[listItem] || item,
      label: listItem ? item[listItem] : item,
    }));
    setOptions(formattedOptions);
  }, [list, listItem]);

  const handleChange = (e, name) => {
    const selected = e.label;

    name === "juzName" && setRest(true);

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
          className="form-select"
          onChange={(e) => handleChange(e, name)}
          placeholder={isRange ? "من" : placeholder}
          options={options}
          value={selectedValue} // Use selectedValue state
          menuPortalTarget={document.body}
          isDisabled={disable ? disable[listItem] : false}
        />
        {isRange && (
          <Select
            menuPlacement={PlacementTop ? "top" : "bottom"}
            styles={customStyles}
            components={animatedComponents}
            isMulti={false}
            name={isRange ? `${name}To` : name}
            id={isRange ? `${name}To` : name}
            className="form-select"
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
