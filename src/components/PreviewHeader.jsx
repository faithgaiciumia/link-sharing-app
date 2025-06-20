import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../data/fetchCurrentUser";
import { CopyIcon } from "@chakra-ui/icons";

export default function PreviewHeader() {
  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setUsername(user.username);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (username) {
      setGeneratedLink(`https://quicklinq.netlify.app/${username}`);
    }
  }, [username]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      toast({
        title: "Link copied!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error("error copying link", err);
      toast({
        title: "Failed to copy.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My WanLinq",
          text: "Check out my link:",
          url: generatedLink,
        });
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    } else {
      toast({
        title: "Share not supported on this browser.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
            onClick={onOpen}
          >
            Share link
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Shareable Link</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex
                  p={3}
                  border="1px solid #ddd"
                  borderRadius="md"
                  justify="space-between"
                  align="center"
                >
                  <Text fontSize="sm" wordBreak="break-all">
                    {generatedLink}
                  </Text>
                  <IconButton
                    aria-label="Copy link"
                    icon={<CopyIcon />}
                    size="sm"
                    ml={2}
                    onClick={copyToClipboard}
                  />
                </Flex>

                <Button
                  mt={4}
                  colorScheme="purple"
                  width="100%"
                  onClick={shareLink}
                >
                  Share via device
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </Box>
  );
}
