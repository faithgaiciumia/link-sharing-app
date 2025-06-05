import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../data/fetchCurrentUser";
import ImageUploader from "./ImageUploader";

export default function ProfilePageMain() {
  const [updated, setUpdated] = useState(false);
  const toast = useToast();
  const [currentUserId, setCurrentUserId] = useState("");
  const [initialImageURL, setInitialImageURL]=useState("");

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      username: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user?._id) {
          setCurrentUserId(user._id);
          setInitialImageURL(user.imageURL);
          const fullName = user.name?.trim() || "";
          const [first = "", last = ""] = fullName.split(" ");

          reset({
            firstName: first,
            lastName: last,
            bio: user.bio || "",
            imageURL: user.imageURL || "",
            userId: user._id,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, [reset, updated]);

  const onSubmit = async (data) => {
    const name = `${data.firstName} ${data.lastName}`.trim();

    try {
      const response = await fetch("https://wanlinq-back.onrender.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation UpdateUser($userId: String!, $name: String!, $bio: String!, $imageURL: String!) {
              updateUserProfileDetails(userId: $userId, name: $name, bio: $bio, imageURL: $imageURL) {
                _id
                name
                bio
                imageURL
              }
            }
          `,
          variables: {
            userId: data.userId,
            name,
            bio: data.bio,
            imageURL: data.imageURL,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(
          result.errors[0]?.message || "Failed to update profile"
        );
      }

      toast({
        title: "Profile updated.",
        description: "Your profile details were successfully updated.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setUpdated((prev) => !prev);
    } catch (error) {
      toast({
        title: "Update failed.",
        description: "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("Error updating profile details", error);
    }
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
        <ImageUploader currentUserId={currentUserId} initialImageURL={initialImageURL} />
        <Text fontSize={"sm"} w={"40%"}>
          Image must be below 1024px*1024px. Use PNG, JPG, or RMP format.
        </Text>
      </Flex>

      <Box my={2} background={"gray.100"} borderRadius={"md"} p={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired display={"flex"} my={2}>
            <FormLabel w={"40%"}>First Name</FormLabel>
            <Input
              w={"60%"}
              borderColor={"gray.700"}
              {...register("firstName", { required: true })}
            />
          </FormControl>

          <FormControl isRequired display={"flex"} my={2}>
            <FormLabel w={"40%"}>Last Name</FormLabel>
            <Input
              w={"60%"}
              borderColor={"gray.700"}
              {...register("lastName", { required: true })}
            />
          </FormControl>

          <FormControl isRequired display={"flex"} my={2}>
            <FormLabel w={"40%"}>Bio</FormLabel>
            <Input
              w={"60%"}
              borderColor={"gray.700"}
              {...register("bio", { required: true })}
            />
          </FormControl>

          <Input
            hidden
            borderColor={"gray.700"}
            {...register("userId", { required: true })}
          />
          <Input hidden borderColor={"gray.700"} {...register("imageURL")} />

          <Flex justifyContent={"end"} mt={4}>
            <Button colorScheme="purple" size={"md"} type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
