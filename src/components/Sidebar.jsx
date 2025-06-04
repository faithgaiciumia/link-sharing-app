import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../data/fetchCurrentUser";

export default function Sidebar() {
  const [imageURL, setImageURL] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchCurrentUser();
        if (user) {
          setImageURL(user.imageURL);
          setFullName(user.name);
          setBio(user.bio);
          setLinks(user.links);
        }
      } catch (error) {
        console.error("error getting user:", error);
      }
    };
    getUser();
  });
  return (
    <Box>
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
          src={imageURL || "https://placehold.co/150"}
          w={"150px"}
          h={"150px"}
        />
        {fullName ? (
          <Heading my={2} textAlign="center" fontSize="md">
            {fullName}
          </Heading>
        ) : (
          <Box
            my={2}
            w={"50%"}
            h={"25px"}
            borderRadius={"lg"}
            background={"white"}
            borderWidth={"1px"}
            borderColor={"white"}
          ></Box>
        )}
        {bio ? (
          <Text textAlign={"center"} fontSize={"sm"} mb={4}>
            {bio}
          </Text>
        ) : (
          <Box
            my={2}
            w={"80%"}
            h={"20px"}
            borderRadius={"lg"}
            background={"white"}
            borderWidth={"1px"}
            borderColor={"white"}
            target="_blank"
            rel="noopener noreferrer"
          ></Box>
        )}
        {links.length === 0 && (
          <Box w={"100%"} my={8}>
            <Button w={"100%"} my={2} borderRadius={"lg"}></Button>
            <Button w={"100%"} my={2} borderRadius={"lg"}></Button>
            <Button w={"100%"} my={2} borderRadius={"lg"}></Button>
          </Box>
        )}
        {links.map((link) => (
          <Button
            w={"100%"}
            my={2}
            borderRadius={"lg"}
            key={link.siteLink}
            as={"a"}
            href={link.siteLink}
          >
            {link.siteName}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
