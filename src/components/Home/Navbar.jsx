import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { LuUserRound } from "react-icons/lu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const location = useLocation();

  return (
    <Box p={4} boxShadow={"lg"} bg={"white"} borderRadius={"lg"}>
      <Flex justify={"space-between"} align={"center"}>
        <Box>
          <Heading fontSize={"md"}>Wanlinq</Heading>
        </Box>
        <Flex gap={6} align={"center"}>
          <Button
            as={RouterLink}
            to={"/home"}
            leftIcon={<LinkIcon />}
            variant={"ghost"}
            borderRadius={"lg"}
            p={2}
            size={"sm"}
            color={location.pathname === "/home" ? "purple.700" : "gray.700"}
            backgroundColor={
              location.pathname === "/home" ? "purple.200" : "transparent"
            }
            _hover={{
              backgroundColor: "purple.100",
              color: "purple.800",
            }}
          >
            Links
          </Button>
          <Button
            as={RouterLink}
            to={"/profile"}
            leftIcon={<LuUserRound />}
            variant={"ghost"}
            borderRadius={"lg"}
            p={2}
            size={"sm"}
            color={location.pathname === "/profile" ? "purple.700" : "gray.700"}
            backgroundColor={
              location.pathname === "/profile" ? "purple.200" : "transparent"
            }
            _hover={{
              backgroundColor: "purple.100",
              color: "purple.800",
            }}
          >
            Profile Details
          </Button>
          <Button
            as={RouterLink}
            to={"/preview"}
            leftIcon={<FiEye />}
            variant={"ghost"}
            borderRadius={"lg"}
            p={2}
            size={"sm"}
            color={location.pathname === "/preview" ? "purple.700" : "gray.700"}
            backgroundColor={
              location.pathname === "/preview" ? "purple.200" : "transparent"
            }
            _hover={{
              backgroundColor: "purple.100",
              color: "purple.800",
            }}
          >
            Preview
          </Button>
        </Flex>
        <Flex>         
          <UserMenu/>
        </Flex>
      </Flex>
    </Box>
  );
}
