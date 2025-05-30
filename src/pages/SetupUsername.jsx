import {
  Box,
  Flex,
  Heading,
  Input,
  useColorModeValue,
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { LuBookDashed } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupUsername() {
  //darkmode and light setup
  const bgColor = useColorModeValue("white", "gray.800");
  const inputBorderColor = useColorModeValue("gray.300", "gray.600");

  //form handling and api request
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //track username as user types
  const username = watch("username");

  useEffect(() => {
    //if username is too short do not bother checking
    if (!username || username.length < 3) {
      return;
    }
    //function to check for username availability

    const delayFunction = setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query IsUsernameAvailable($username: String!) {
                isUsernameAvailable(username: $username)
              }
            `,
            variables: { username },
          }),
        });
        const result = await res.json();
        const available = result?.data?.isUsernameAvailable;
        if (!available) {
          setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
        } else {
          clearErrors("username");
        }
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    }, 500);
    return () => clearTimeout(delayFunction);
  }, [username, setError, clearErrors]);

  const onSubmit = async ({ username }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation SetUsername($username: String!) {
              updateUserUsername(username: $username) {
                username
              }
            }
          `,
          variables: { username },
        }),
      });

      const data = await res.json();
      if (data?.data?.updateUserUsername?.username) {
        navigate("/home");
      } else {
        alert("Failed to set username. Try another one.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
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
          Set your username
        </Heading>

        <Box mt={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup mb={2}>
              <InputLeftAddon>wanlinq.app/</InputLeftAddon>
              <Input
                type="text"
                placeholder="yourname"
                autoFocus
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+$/,
                    message: "Only letters, numbers, _ and - allowed",
                  },
                })}
                borderColor={inputBorderColor}
                fontSize="sm"
              />
            </InputGroup>

            {errors.username && (
              <Box color="red.500" fontSize="xs" mb={3}>
                {errors.username.message}
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
              loadingText="Updating..."
              _hover={isValid ? {} : { bg: "blackAlpha.700" }}
            >
              Set
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
