import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

export default function Home() {
  return (
    <Box p={2}>
        <Navbar />
        <Flex gap={2}>
            <Sidebar/>
            <MainContent/>
        </Flex>
    </Box>
  );
}
