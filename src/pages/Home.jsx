/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import { useEffect } from "react";
import { fetchSession } from "../data/fetchSession";

export default function Home() {
  //get user email and session details
  const toast = useToast();
  useEffect(() => {
    const loadUser = async () => {
      const session = await fetchSession();
      if (session?.user?.email) {
        toast({
          description: `Logged in as ${session.user.email}`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    loadUser();
  }, []);
  return (
    <Box p={2}>
      <Navbar />
      <Flex gap={2}>
        <Box
          boxShadow={"lg"}
          borderRadius={"lg"}
          background={"white"}
          minH={"80vh"}
          my={4}
          width={"30%"}
          p={8}
          h={"auto"}
        >
          <Sidebar />
        </Box>
        <MainContent />
      </Flex>
    </Box>
  );
}
