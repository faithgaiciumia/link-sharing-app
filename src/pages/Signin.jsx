import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { LuBookDashed } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Signin() {
  //react hook form for validation and tracking
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  //autofocus input
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  //intuitive form
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  //dark and light mode enable
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const csrfResponse = await fetch("http://localhost:4000/auth/csrf", {
        credentials: "include",
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      const formBody = new URLSearchParams();
      formBody.append("email", data.email);
      formBody.append("csrfToken", csrfToken);
      formBody.append("callbackUrl", "http://localhost:5173");

      const res = await fetch("http://localhost:4000/auth/signin/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formBody.toString(),
      });

      if (res.ok) {
        toast({
          title: "Magic link sent!",
          description: "Check your email inbox to sign in.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        const errorText = await res.text();
        throw new Error(errorText);
      }
    } catch (error) {
      toast({
        title: "Error sending link",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" p={4}>
      <Box
        bg={bgColor}
        w={{ base: "100%", sm: "90%", md: "70%", lg: "35%" }}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Flex justify="center" align="center" mb={4}>
          <LuBookDashed size={32} color="purple" />
        </Flex>

        <Heading textAlign="center" size="lg" mb={2}>
          Login to Wanlinq
        </Heading>
        <Heading textAlign="center" size="sm" mb={6} color="gray.500">
          Connect with 50% more people.
        </Heading>

        <Box mt={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              borderColor={inputBorderColor}
              mb={2}
              fontSize="sm"
            />
            {errors.email && (
              <Box color="red.500" fontSize="xs" mt={-1} mb={2}>
                {errors.email.message}
              </Box>
            )}

            <Button
              type="submit"
              size="lg"
              w="100%"
              fontSize="sm"
              colorScheme={isValid ? "purple" : undefined}
              bg={isValid ? undefined : "blackAlpha.800"}
              color={isValid ? undefined : "white"}
              isLoading={loading}
              loadingText="Sending"
              _hover={isValid ? {} : { bg: "blackAlpha.700" }}
            >
              Sign in with Email
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
