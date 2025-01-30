import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PreviewHeader() {
  const navigate = useNavigate();
  return (
    <Box
      h={"50vh"}
      backgroundColor={"purple.300"}
      w={"100%"}
      borderBottomRadius={"50px"}
      py={8}
      px={4}
    >
      <Box backgroundColor={"white"} p={2} borderRadius={"lg"}>
        <Flex justify={"space-between"} align={"center"}>
          <Button
            variant={"outline"}
            colorScheme="purple"
            size={"sm"}
            onClick={() => navigate("/")}
          >
            Back to editor
          </Button>
          <Button colorScheme="purple" size={"sm"}>
            Share link
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
