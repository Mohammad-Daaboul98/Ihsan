import { ChevronDownIcon } from "@chakra-ui/icons";
import { MenuButton, MenuList, Menu, MenuItem } from "@chakra-ui/react";
import React from "react";

const MenuComponent = ({ name, action }) => {
  return (
    <Menu isLazy>
      <MenuButton>
        <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuItem display='flex' justifyContent='center' onClick={() => action()}>
          {name}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuComponent;
