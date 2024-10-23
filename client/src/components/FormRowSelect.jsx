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
  listItem,
  onChange,
  defaultValue,
  defaultKey,
  placeholder = "اختر الخيار",
  PlacementTop,
  disable,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const customStyles = useSelectStyles();

  useEffect(() => {
    const formattedOptions = list.map((item) => ({
      value: item._id || item.id || item[listItem] || item,
      label: listItem ? item[listItem] : item,
    }));
    setOptions(formattedOptions);
  }, [list, listItem]);

  const handleChange = (selected) => {
    setSelectedValue(selected);
    onChange && onChange(selected.value);
  };
  // console.log(defaultValue);
  // console.log(defaultKey);

  return (
    <>
      <FormControl className="form-row">
        <FormLabel htmlFor={name} mb={2} fontWeight="bold">
          {labelText || name}
        </FormLabel>
        <Select
          menuPlacement={PlacementTop ? "top" : "bottom"}
          styles={customStyles}
          components={animatedComponents}
          isMulti={false}
          name={name}
          id={name}
          className="form-select"
          onChange={handleChange}
          placeholder={placeholder}
          options={options}
          value={selectedValue}
          // defaultValue={defaultValue[defaultKey]}
          menuPortalTarget={document.body}
          isDisabled={disable ? disable.juzName : false}
        ></Select>
      </FormControl>
    </>
  );
};

export default FormRowSelect;
