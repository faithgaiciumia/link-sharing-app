import { Box } from "@chakra-ui/react";
import LandingNav from "../components/Landing/LandingNav";
import Hero from "../components/Landing/Hero";

export default function Landing(){
    return(
        <Box p={4}>
        <LandingNav/>
        <Box my={4}>
            <Hero/>
        </Box>
        </Box>
    )
}