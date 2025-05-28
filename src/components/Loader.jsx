import { Center, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Center height="100vh">
      <Spinner size="xl" thickness="4px" speed="0.65s" color="purple.500" />
    </Center>
  );
}
