/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useToast } from "@chakra-ui/react";
import Navbar from "../components/Home/Navbar";
import MainContent from "../components/Home/MainContent";
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
      <Box>
        <MainContent />
      </Box>
    </Box>
  );
}
