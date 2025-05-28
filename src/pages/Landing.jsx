/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react";
import LandingNav from "../components/Landing/LandingNav";
import Hero from "../components/Landing/Hero";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchSession } from "../data/fetchSession";

export default function Landing() {
  //check for already logged in users
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const session = await fetchSession();
      if (session?.user?.email) {
        navigate("/home");
      }
    };
    loadUser();
  }, []);
  return (
    <Box p={4}>
      <LandingNav />
      <Box my={4}>
        <Hero />
      </Box>
    </Box>
  );
}
