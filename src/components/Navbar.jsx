import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { LuUserRound } from "react-icons/lu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

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
            to={"/"}
            leftIcon={<LinkIcon />}
            variant={"ghost"}
            borderRadius={"lg"}
            p={2}
            size={"sm"}
            color={location.pathname === "/" ? "purple.700" : "gray.700"}
            backgroundColor={
              location.pathname === "/" ? "purple.200" : "transparent"
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
        </Flex>
        <Flex>
          <Button as={RouterLink} to={"/preview"} variant={"outline"} colorScheme="purple" size={"sm"}>
            Preview
          </Button>
          <LogoutButton/>
        </Flex>
      </Flex>
    </Box>
  );
}
