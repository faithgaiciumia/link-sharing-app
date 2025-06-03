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

export default function ImageUploader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageURL, setImageURL] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await uploadToCloudinary(file);
        setImageURL(url);
        console.log("uploaded image:", url);
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
