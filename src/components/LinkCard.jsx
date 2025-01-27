import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";

export default function LinkCard() {
  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Button variant={"ghost"} leftIcon={<BiMenu />} size={"md"}>
          Link #1
        </Button>
        <Button variant={"ghost"} size={"md"}>
          Remove
        </Button>
      </Flex>
      <Box>
        <FormControl my={2}>
          <FormLabel fontSize={"sm"} color={"gray"}>
            Platform
          </FormLabel>
          <Input value={"Github"} fontSize={"sm"} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={"sm"} color={"gray"}>
            Link
          </FormLabel>
          <Input value={"https://github.com/faithgaiciumia/"} fontSize={"sm"} />
        </FormControl>
      </Box>
      <Flex justify={"end"} my={4}>
        <Button colorScheme="purple">Save</Button>
      </Flex>
    </Box>
  );
}
