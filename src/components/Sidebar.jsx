import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import useLinkStore from "../store/useLinkStore";

export default function Sidebar() {
  const { profile } = useLinkStore();
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
          src={profile.avatar || "https://placehold.co/150"}
          w={"150px"}
          h={"150px"}
        />
        <Heading my={2} textAlign={"center"} fontSize={"md"}>
          {profile.firstName} {profile.lastName}
        </Heading>
        <Text textAlign={"center"} fontSize={"sm"} mb={4}>
          {profile.bio}
        </Text>
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
