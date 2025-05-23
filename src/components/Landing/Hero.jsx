import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 10, md: 20 }}>
      <Flex
        direction={"column"}
        justify={"start"}
        align={"center"}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={10}
        >
          {/* Left Content */}
          <Box flex="1">
            <Stack spacing={10}>
              <Heading
                fontSize={{ base: "2xl", md: "6xl" }}
                fontWeight="bold"
                lineHeight="short"
                color={useColorModeValue("gray.800", "white")}
              >
                All your links merged to one.
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color={useColorModeValue("gray.600", "gray.300")}
              >
                Create your special dev digital contact card. Share a single link with your
                clients, followers, and friends connecting to your social profiles and dev content. 
              </Text>
              <Button
                colorScheme="purple"
                size="lg"
                borderRadius="lg"
                w={{ base: "full", sm: "auto" }}
                fontWeight={"light"}
                _hover={{ bg: "purple.700" }}
              >
                Signup (Free)
              </Button>
            </Stack>
          </Box>

          {/* Right Image */}
          <Box flex="1" display={{ base: "none", md: "block" }}>
            <Image
              src="https://via.placeholder.com/500x300?text=Your+Product+Image"
              alt="Link management illustration"
              borderRadius="xl"
              boxShadow="lg"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
