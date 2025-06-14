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
  useDisclosure,
  useToast,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../data/cloudinaryUpload";

export default function ImageUploader({ currentUserId, initialImageURL }) {
  //monitor image url
  useEffect(() => {
    if (initialImageURL) {
      setImageURL(initialImageURL);
    }
  }, [initialImageURL]);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageURL, setImageURL] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  async function updateUserImageURL(imageURL, userId) {
    try {
      const response = await fetch("https://wanlinq-back.onrender.com/graphql", {
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
    if (!file) return;
    setIsUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setImageURL(url);

      updateUserImageURL(url, currentUserId)
        .then(() => {
          //console.log("updated user", updatedUser);
          toast({
            title: "Image Updated",
            description: "Your profile picture was updated successfully.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.error("Image update failed", err);
          toast({
            title: "Upload Failed",
            description: "There was a problem uploading your image.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.error("failed to upload image", error);
    } finally {
      setIsUploading(false);
      onClose();
    }
  };

  return (
    <>
      <Box
        w="200px"
        h="200px"
        position="relative"
        borderRadius="full"
        backgroundImage={`url(${imageURL || "https://placehold.co/200"})`}
        backgroundSize="cover"
        backgroundPosition="center"
        overflow="hidden"
        boxShadow="lg"
      >
        <IconButton
          icon={<FaCamera />}
          aria-label="Change Profile Picture"
          position="absolute"
          bottom="20px"
          right="32px"
          size="sm"
          bg="whiteAlpha.800"
          _hover={{ bg: "purple.600", color: "whiteAlpha.800" }}
          color="gray.700"
          borderRadius="full"
          onClick={onOpen}
          boxShadow="md"
          zIndex={2}
        />
      </Box>

      {/* Modal for uploading image */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Profile Picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              as="label"
              htmlFor="file-upload"
              colorScheme="blue"
              w="100%"
              cursor="pointer"
              isDisabled={isUploading}
            >
              {isUploading ? (
                <Flex align="center" justify="center" gap={2}>
                  <Spinner colorScheme="purple" size="sm" /> Uploading...
                </Flex>
              ) : (
                "Choose Image"
              )}
            </Button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} isDisabled={isUploading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
