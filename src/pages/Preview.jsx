import { Box, Flex } from "@chakra-ui/react";
import PreviewHeader from "../components/PreviewHeader";
import Sidebar from "../components/Sidebar";

export default function Preview() {
  return (
    <Box>
      <PreviewHeader />
      <Flex justify={"center"} my={-150} align={"center"}>
        <Box w={"30%"}>
          <Sidebar />
        </Box>
      </Flex>
    </Box>
  );
}
