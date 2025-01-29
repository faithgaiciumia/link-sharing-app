import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";

export default function ProfilePageMain() {
  return (
    <Box
      boxShadow={"lg"}
      borderRadius={"lg"}
      background={"white"}
      minH={"80vh"}
      my={4}
      width={"70%"}
      p={4}
    >
      <Box>
        <Heading fontSize={"md"} my={2}>
          Profile details
        </Heading>
        <Text fontSize={"sm"} color={"gray"}>
          Add personal details to create a personal touch to your profile.
        </Text>
      </Box>
      <Flex
        my={2}
        justify={"space-between"}
        align={"center"}
        background={"gray.100"}
        borderRadius={"md"}
        p={2}
      >
        <Text fontSize={"sm"}>Profile picture</Text>
        <Image src="" w={"200px"} h={"200px"} alt="profile" />
        <Text fontSize={"sm"}>
          Image must be below 1024px*1024px. Use PNG, JPG, or RMP format.
        </Text>
      </Flex>
      <Box my={2} background={"gray.100"} borderRadius={"md"} p={2}>
        <FormControl isRequired display={"flex"} my={2}>
          <FormLabel w={"40%"}>First Name</FormLabel>
          <Input placeholder="Ben" w={"60%"} borderColor={"gray.700"} />
        </FormControl>
        <FormControl isRequired display={"flex"} my={2}>
          <FormLabel w={"40%"}>Last Name</FormLabel>
          <Input placeholder="Ben" w={"60%"} borderColor={"gray.700"} />
        </FormControl>
        <FormControl display={"flex"} my={2}>
          <FormLabel w={"40%"}>Email</FormLabel>
          <Input placeholder="Ben" w={"60%"} borderColor={"gray.700"} />
        </FormControl>
      </Box>
      <Flex justifyContent={"end"}>
        <Button colorScheme="purple" size={"md"}>
          Save
        </Button>
      </Flex>
    </Box>
  );
}
