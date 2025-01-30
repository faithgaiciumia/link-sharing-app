import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
import useLinkStore from "../store/useLinkStore";
import { useForm } from "react-hook-form";
export default function PreviewHeader() {
  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { generateLink, generatedLink, username, setUsername} = useLinkStore();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data)=>{
    console.log(data);
    setUsername(data.username);
    generateLink();
    onClose();    
  }
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
                <ModalBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder="shumlinks/"
                        {...register("username", { required: true })}
                      />
                    </FormControl>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="purple" type="submit" onClick={handleSubmit(onSubmit)}>Save</Button>
                </ModalFooter>
              </ModalContent>
            )}
          </Modal>
        </Flex>
      </Box>
    </Box>
  );
}
