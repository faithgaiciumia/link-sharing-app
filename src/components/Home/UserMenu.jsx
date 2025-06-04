import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@chakra-ui/react";
import LogoutButton from "../LogoutButton";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../data/fetchCurrentUser";

export default function UserMenu() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setUserName(user.username);
      }
    };
    getUser();
  }, []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        p={1}
        _hover={{ bg: "gray.100" }}
        borderRadius="full"
      >
        <Avatar
          name={userName}
          size="sm"
          bg="purple.500"
          color="white"
          fontWeight="bold"
          fontSize="sm"
        ></Avatar>
      </MenuButton>
      <MenuList p={4}>
        <MenuItem>
          <LogoutButton />
        </MenuItem>
        {/* Future items */}
        {/* <MenuItem>Settings</MenuItem>
        <MenuItem>Account</MenuItem> */}
      </MenuList>
    </Menu>
  );
}
