import {
  FormControl,
  FormLabel,
  Select
} from "@chakra-ui/react";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  listItem,
  onChange,
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
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index}  value={itemValue._id}>
              {itemValue[listItem]}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FormRowSelect;
