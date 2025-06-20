import {
  Box,
  Button,
  Flex,  
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../data/fetchCurrentUser";
export default function PreviewHeader() {
  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();

  //get the stored username
  const [username, setUsername] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };
    const generateLink = () => {
      setGeneratedLink(`https://quicklinq.netlify.app/${username}`);
    };
    getUser();
    generateLink();
  }, [username]);

  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);
  //   setUsername(data.username);
  //   generateLink();
  //   onClose();
  // };
  return (
    <Box
      h={"50vh"}
      backgroundColor={"purple.300"}
      w={"100%"}
      borderBottomRadius={"50px"}
      py={8}
      px={4}
    >
      <Box backgroundColor={"white"} p={2} borderRadius={"lg"}>
        <Flex justify={"space-between"} align={"center"}>
          <Button
            variant={"outline"}
            colorScheme="purple"
            size={"sm"}
            onClick={() => navigate("/")}
          >
            Back to editor
          </Button>
          <Button
            colorScheme="purple"
            size={"sm"}
            onClick={() => {
              onOpen();
            }}
          >
            Share link
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            {username ? (
              <ModalContent>
                <ModalHeader>Shareable Link</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>Your shareable Link is: {generatedLink}</Text>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            ) : (
              <ModalContent>
                <ModalHeader>Please select a username first: </ModalHeader>
                <ModalCloseButton />
              </ModalContent>
            )}
          </Modal>
        </Flex>
      </Box>
    </Box>
  );
}
