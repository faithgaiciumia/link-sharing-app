import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { LuBookDashed } from "react-icons/lu";

export default function LandingNav() {
  const bg = useColorModeValue("gray.100", "gray.800");
  //const hoverBg = useColorModeValue("purple.700", "purple.700");

  return (
    <Box bg={bg} px={6} py={4} borderRadius="lg" boxShadow="md">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={2}>
          <LuBookDashed size={24} color="purple" />
          <Heading fontSize="md" fontFamily={"heading"}>
            WanLinq
          </Heading>
        </Flex>
        {/* <Button 
          colorScheme="purple" 
          size="md" 
          borderRadius="lg"
          fontWeight={"light"}
          _hover={{ bg: hoverBg }}
        >
          Get Started
        </Button> */}
      </Flex>
    </Box>
  );
}
