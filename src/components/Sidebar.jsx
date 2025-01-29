import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function Sidebar() {
  return (
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
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        borderWidth={"1px"}
        borderRadius={"lg"}
        w={"100%"}
        h={"100%"}
        backgroundColor={" #4158D0"}
        backgroundImage={
          "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
        }
        p={4}
      >
        <Image
          borderRadius={"full"}
          src="https://placehold.co/150"
          w={"150px"}
          h={"150px"}
        />
        <Heading my={2} textAlign={"center"} fontSize={"md"}>
          Faith Gaiciumia
        </Heading>
        <Text textAlign={"center"} fontSize={"sm"} mb={4}>Hardworking mother and developer</Text>
        <Button w={"100%"} my={2} borderRadius={"lg"}>
          Github
        </Button>
        <Button w={"100%"} my={2} borderRadius={"lg"}>
          Linked In
        </Button>
        <Button w={"100%"} my={2} borderRadius={"lg"}>
          Medium
        </Button>
      </Flex>
    </Box>
  );
}
