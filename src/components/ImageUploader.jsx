/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useState } from "react";
import { uploadToCloudinary } from "../data/cloudinaryUpload";

export default function ImageUploader({ currentUserId }) {
  console.log("user id", currentUserId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageURL, setImageURL] = useState("");

  async function updateUserImageURL(imageURL, userId) {
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation UpdateUserImage($imageURL: String!, $userId: String!) {
            updateUserImageURL(imageURL: $imageURL, userId: $userId) {
              _id
              imageURL
            }
          }
        `,
          variables: {
            imageURL,
            userId,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data.updateUserImageURL;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadToCloudinary(file);
        setImageURL(url);

        updateUserImageURL(imageURL, currentUserId)
          .then((updatedUser) => {
            console.log("updated user", updatedUser);
          })
          .catch((err) => {
            console.error("Image update failed", err);
          });
      } catch (error) {
        console.error("failed to upload image", error);
      }
    }
    onClose();
  };

  return (
    <>
      <Box
        w="200px"
        h="200px"
        borderRadius="full"
        backgroundImage={`url(${imageURL || "https://placehold.co/200"})`}
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
            onClick={onOpen}
          >
            Change Image
          </Button>
        </Flex>
      </Box>

      {/* Modal for uploading image */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
