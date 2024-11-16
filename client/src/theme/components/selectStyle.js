import { position, useColorModeValue } from "@chakra-ui/react";

export const useSelectStyles = () => {
  const bg = useColorModeValue("white", "#2d3748");
  const dropdownBg = useColorModeValue("white", "#171923");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("#CBD5E0", "#4A5568");
  const placeholderColor = useColorModeValue("#718096", "#A0AEC0");
  const inputHeight = "48px";

  return {
    control: (provided) => ({
      ...provided,
      backgroundColor: bg,
      borderColor: borderColor,
      color: color,
      fontSize: "16px",
      minHeight: inputHeight,
      height: inputHeight,
      padding: "0 8px",
      boxShadow: "none",
      "&:hover": {
        borderColor: borderColor,
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: color,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: dropdownBg,
      zIndex: 9999,
      borderRadius: "6px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? borderColor : dropdownBg, // Solid bg for options
      color: state.isSelected ? color : provided.color,
      "&:hover": {
        backgroundColor: borderColor,
        color: color,
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: placeholderColor,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: borderColor,
      color: color,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: color,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: color,
      ":hover": {
        backgroundColor: borderColor,
        color: color,
      },
    }),
  };
};
