import { Box, Flex, Text } from "@chakra-ui/react";

export default function EmailSent({email}){
    return(
        <Box>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Text fontSize={"sm"} textAlign={"center"}>We&apos;ve sent you a magic login link. Please check your inbox at <strong>{email}</strong> </Text>
            </Flex>
        </Box>
    )
}