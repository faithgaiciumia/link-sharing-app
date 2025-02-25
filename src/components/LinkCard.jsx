/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";

export default function LinkCard({ index, platform, link, onRemove }) {
  return (
    <Box my={4} background={"gray.100"} p={4} borderRadius={"md"}>
      <Flex justifyContent={"space-between"}>
        <Button variant={"ghost"} leftIcon={<BiMenu />} size={"sm"}>
          Link #{index}
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          leftIcon={<FaTrash />}
          colorScheme="red"
          onClick={onRemove}
        >
          Remove
        </Button>
      </Flex>
      <Box>
        <FormControl my={2}>
          <FormLabel fontSize={"sm"} color={"gray"}>
            Platform
          </FormLabel>
          <Input value={platform} fontSize={"sm"} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"sm"} color={"gray"}>
            Link
          </FormLabel>
          <Input value={link} fontSize={"sm"} />
        </FormControl>
      </Box>
      {/* <Flex justify={"end"} my={4}>
        <Button colorScheme="purple">Save</Button>
      </Flex> */}
    </Box>
  );
}
