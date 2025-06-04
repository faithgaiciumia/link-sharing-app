import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Flex,
  Text,
  Box,
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
        <Box bg={"gray.100"} p={4} borderRadius={"md"} mb={4}>
          <Flex justifyContent={"center"} align={"center"} direction={"column"}>
            <Avatar
            name={userName}
            size="sm"
            bg="purple.500"
            color="white"
            fontWeight="bold"
            fontSize="sm"
          ></Avatar>
          <Text fontSize={"sm"} my={2}>{userName}</Text>
          </Flex>
          
        </Box>
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
