import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const FormRowSelect = ({
  name,
  labelText,
  list = [],
  defaultValue = "",
  listItem,
  onChange,
  placeholder = "اختر الخيار", 
}) => {
  return (
    <FormControl className="form-row">
      <FormLabel htmlFor={name} mb={2} fontWeight="bold">
        {labelText || name}
      </FormLabel>
      <Select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder} // Display placeholder if no option selected
      >
        {list.length === 0 ? (
          <option value="">{placeholder}</option>
        ) : (
          list.map((itemValue, index) => {
            return (
              <option key={index} value={itemValue._id || itemValue.id}>
                {listItem ? itemValue[listItem] : itemValue}
              </option>
            );
          })
        )}
      </Select>
    </FormControl>
  );
};

export default FormRowSelect;
