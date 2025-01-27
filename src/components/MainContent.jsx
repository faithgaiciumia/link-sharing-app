import { Box, Button, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import LinkCard from "./LinkCard";

export default function MainContent() {
  const {isOpen, onOpen, onClose}=useDisclosure();
  return (
    <Box
      boxShadow={"lg"}
      borderRadius={"lg"}
      background={"white"}
      height={"80vh"}
      my={4}
      width={"70%"}
      p={4}
    >
      <Box>
        <Heading fontSize={"md"} my={2}>
          Customize your links
        </Heading>
        <Text fontSize={"sm"} color={"gray"}>
          Add/edit/remove links below and then share all of your profiles with
          the world!
        </Text>
      </Box>{" "}
      <Box my={8}>
        <Button
          leftIcon={<FaPlus />}
          variant={"outline"}
          colorScheme="purple"
          w={"100%"}
          onClick={onOpen}
        >
          Add new link
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader fontSize={"md"}>Add new link</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <form>
                <FormControl my={2}>
                  <FormLabel fontSize={"sm"} color={"gray"}>Platform</FormLabel>
                  <Input type="text" fontSize={"sm"} />                  
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={"sm"} color={"gray"}>Link</FormLabel>
                  <Input type="text" fontSize={"sm"} />                  
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" type="submit">Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box>
        <LinkCard />
      </Box>
    </Box>
  );
}
