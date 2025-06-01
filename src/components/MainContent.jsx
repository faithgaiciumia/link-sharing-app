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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import LinkCard from "./LinkCard";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../data/fetchCurrentUser";

export default function MainContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [updated, setUpdated] = useState(false);
  const [fetchingLinks, setFetchingLinks] = useState(false);

  // Fetch user links on component mount and when 'updated' changes
  useEffect(() => {
    const fetchUserLinks = async () => {
      setFetchingLinks(true);
      try {
        const user = await fetchCurrentUser();
        if (user?.links) {
          setLinks(user.links);
        } else {
          setLinks([]);
          toast({
            description: "No links found for this user.",
            status: "info",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching links", error);
        toast({
          description: "Failed to fetch links. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setFetchingLinks(false);
      }
    };
    fetchUserLinks();
  }, [updated, toast]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const user = await fetchCurrentUser();

      if (!user?._id) {
        toast({
          title: "Authentication Error",
          description: "User not authenticated. Please log in.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const { siteName, siteLink } = data;

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation AddUserLink($userId: ID!, $siteName: String!, $siteLink: String!) {
              addUserLink(userId: $userId, siteName: $siteName, siteLink: $siteLink) {
                _id
              }
            }
          `,
          variables: {
            userId: user._id,
            siteName,
            siteLink,
          },
        }),
      });

      const resData = await res.json();

      if (resData?.data?.addUserLink?._id) {
        toast({
          description: "Link successfully added!",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        reset(); // reset form fields
        onClose(); // close modal
        setUpdated((prev) => !prev); // trigger refetch links
      } else {
        toast({
          title: "Failed to add link",
          description:
            resData?.errors?.[0]?.message ||
            "An unknown error occurred. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Something went wrong adding new link", error);
      toast({
        title: "Network Error",
        description: "Something went wrong while connecting to the server.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (linkId) => {
    try {
      const user = await fetchCurrentUser();

      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation DeleteUserLink($userId: ID!, $linkId: ID!) {
            deleteUserLink(userId: $userId, linkId: $linkId) {
              _id
            }
          }
        `,
          variables: {
            userId: user._id,
            linkId,
          },
        }),
      });

      const json = await res.json();

      if (json?.data?.deleteUserLink?._id) {
        return "deleted successfully";
      } else {
        return "error deleting";
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      return "error deleting";
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
          Customize your links
        </Heading>
        <Text fontSize={"sm"} color={"gray"}>
          Add/edit/remove links below and then share all of your profiles with
          the world!
        </Text>
      </Box>
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
              <form id="add-link-form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl my={2}>
                  <FormLabel fontSize={"sm"} color={"gray"}>
                    Platform
                  </FormLabel>
                  <Select
                    fontSize={"sm"}
                    {...register("siteName", { required: true })}
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
                    {...register("siteLink", { required: true })}
                  />
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="purple"
                type="submit"
                form="add-link-form"
                isLoading={loading}
                loadingText="Adding..."
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box>
        {fetchingLinks ? (
          <Spinner size="lg" label="Loading links..." colorScheme="purple" />
        ) : links.length === 0 ? (
          <Text color="gray" fontStyle="italic">
            No links added yet.
          </Text>
        ) : (
          links.map((link, index) => (
            <LinkCard
              key={link._id}
              platform={link.siteName}
              link={link.siteLink}
              index={index + 1}
              onRemove={() => handleRemove(link._id)}
              setUpdated={setUpdated}
            />
          ))
        )}
      </Box>
    </Box>
  );
}
