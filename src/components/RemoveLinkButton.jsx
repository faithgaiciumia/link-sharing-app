/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function RemoveLinkButton({ onRemove, setUpdated }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await onRemove();

      if (result === "deleted successfully") {
        toast({
          title: "Link Removed Successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setUpdated((prev) => !prev) //trigger a refetch links
      } else {
        toast({
          title: "Error",
          description: "Could not delete the link. Please try again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("delete link error:", error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<FaTrash />}
        colorScheme="red"
        onClick={onOpen}
        isDisabled={loading}
      >
        Remove
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Link
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove this link? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={loading}
                loadingText="Deleting"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
