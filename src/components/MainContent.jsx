import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import LinkCard from "./LinkCard";
import { useForm } from "react-hook-form";
import useLinkStore from "../store/useLinkStore";


export default function MainContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const {links,addLink, removeLink}=useLinkStore();
  
  const onSubmit = (data) => {
    addLink(data);
    reset();
    onClose();
  };
  const handleRemove = (indexToRemove) => {
    removeLink(indexToRemove);
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
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={"md"}>Add new link</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl my={2}>
                  <FormLabel fontSize={"sm"} color={"gray"}>
                    Platform
                  </FormLabel>
                  <Select
                    type="text"
                    fontSize={"sm"}
                    {...register("platform", { required: true })}
                  >
                    <option value={"Github"}>Github</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter">Twitter (X)</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize={"sm"} color={"gray"}>
                    Link
                  </FormLabel>
                  <Input
                    type="text"
                    fontSize={"sm"}
                    {...register("link", { required: true })}
                  />
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="purple"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box>
        {links.map((link, index) => (
          <LinkCard
            key={index}
            platform={link.platform}
            link={link.link}
            index={index + 1}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </Box>
    </Box>
  );
}
