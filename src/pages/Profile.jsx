import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfilePageMain from "../components/ProfilePageMain";

export default function Profile() {
  return (
    <Box p={2}>
      <Navbar />
      <Flex gap={2}>
        <Box
          boxShadow={"lg"}
          borderRadius={"lg"}
          background={"white"}
          minH={"80vh"}
          my={4}
          width={"30%"}
          p={8}
          h={"auto"}
        >
          <Sidebar />
        </Box>
        <ProfilePageMain />
      </Flex>
    </Box>
  );
}
