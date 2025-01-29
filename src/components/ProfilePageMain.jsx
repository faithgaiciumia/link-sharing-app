import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import useLinkStore from "../store/useLinkStore";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaImage } from "react-icons/fa";

export default function ProfilePageMain() {
  const { profile, updateProfile } = useLinkStore();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    reset(profile);
  }, [profile, reset]);
  const onSubmit = (data) => {
    updateProfile(data);
    reset();
  };
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
        <Text fontSize={"sm"} fontWeight={600}>
          Profile picture
        </Text>
        <Box
          w="200px"
          h="200px"
          borderRadius="full"
          backgroundImage={`url(${
            profile.avatar || "https://placehold.co/200"
          })`}
          backgroundSize="cover"
          backgroundPosition="center"
          overflow="hidden"
        >
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            h={"100%"}
            bg="rgba(0, 0, 0, 0.3)"
          >
            <Button
              variant={"ghost"}
              color="white"
              leftIcon={<FaImage />}
              size={"md"}
            >
              Change Image
            </Button>
          </Flex>
        </Box>
        <Text fontSize={"sm"} w={"40%"}>
          Image must be below 1024px*1024px. Use PNG, JPG, or RMP format.
        </Text>
      </Flex>
      <Box my={2} background={"gray.100"} borderRadius={"md"} p={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired display={"flex"} my={2}>
            <FormLabel w={"40%"}>First Name</FormLabel>
            <Input
              placeholder="Ben"
              w={"60%"}
              borderColor={"gray.700"}
              {...register("firstName", { required: true })}
            />
          </FormControl>
          <FormControl isRequired display={"flex"} my={2}>
            <FormLabel w={"40%"}>Last Name</FormLabel>
            <Input
              placeholder="Ben"
              w={"60%"}
              borderColor={"gray.700"}
              {...register("lastName", { required: true })}
            />
          </FormControl>
          <FormControl isRequired display={"flex"} my={2}>
            <FormLabel w={"40%"}>Bio</FormLabel>
            <Input
              placeholder="Ben"
              w={"60%"}
              borderColor={"gray.700"}
              {...register("bio", { required: true })}
            />
          </FormControl>
          <FormControl display={"flex"} my={2}>
            <FormLabel w={"40%"}>Email</FormLabel>
            <Input
              placeholder="Ben"
              w={"60%"}
              borderColor={"gray.700"}
              {...register("email", { required: true })}
            />
          </FormControl>
        </form>
      </Box>
      <Flex justifyContent={"end"}>
        <Button
          colorScheme="purple"
          size={"md"}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Flex>
    </Box>
  );
}
