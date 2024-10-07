import { FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelectStyles } from "../theme/components/selectStyle";

const animatedComponents = makeAnimated();

const FormRowSelect = ({
  name,
  labelText,
  list = [],
  initialDefaultValue,
  defaultKey,
  listItem,
  onChange,
  placeholder = "اختر الخيار",
  isMulti = false,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const customStyles = useSelectStyles(); // Use custom styles

  // Format options from the list when it changes
  useEffect(() => {
    const formattedOptions = list.map((item) => ({
      value: item._id || item.id || item[listItem] || item,
      label: listItem ? item[listItem] : item,
    }));
    setOptions(formattedOptions);
  }, [list, listItem]);

  // Handle selection changes
  const handleChange = (selected) => {
    const selectedValues = isMulti
      ? selected?.map((option) => option.value) // For multi-select
      : selected?.value || null; // For single select

    setSelectedValue(selected); // Update local state
    onChange && onChange(selectedValues[0]); // Trigger onChange with raw values
  };

  return (
    <FormControl className="form-row">
      <FormLabel htmlFor={name} mb={2} fontWeight="bold">
        {labelText || name}
      </FormLabel>
      <Select
        styles={customStyles}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        name={name}
        id={name}
        className="form-select"
        onChange={handleChange}
        placeholder={placeholder}
        options={options}
        value={selectedValue}
      ></Select>
    </FormControl>
  );
};

export default FormRowSelect;
