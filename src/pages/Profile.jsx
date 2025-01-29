import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProfilePageMain from "../components/ProfilePageMain";

export default function Profile() {
  return (
    <Box p={2}>
      <Navbar />
      <Flex gap={2}>
        <Sidebar />
        <ProfilePageMain/>
      </Flex>
    </Box>
  );
}
