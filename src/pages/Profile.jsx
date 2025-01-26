import { Box, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <Box p={2}>
      <Navbar />
      <Heading fontSize={"sm"}>hello profile page</Heading>
    </Box>
  );
}
