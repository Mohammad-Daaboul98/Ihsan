import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const FormRowSelect = ({
  name,
  labelText,
  list = [],
  initialDefaultValue,
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
        onChange={onChange}
        placeholder={placeholder}
      >
        <option value={initialDefaultValue}>{initialDefaultValue}</option>
        {list.length === 0 ? (
          <option value="">{placeholder}</option>
        ) : (
          list.map((itemValue, index) => {
            return (
              <option
                key={index}
                value={itemValue._id || itemValue.id || itemValue[listItem]}
              >
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
