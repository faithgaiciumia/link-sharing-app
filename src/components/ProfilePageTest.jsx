import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export default function ProfilePageTest() {
  const { register, handleSubmit } = useForm({});
  const onSubmit = async (data) => {
    console.log("data:", data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired display={"flex"} my={2}>
          <FormLabel w={"40%"}>First Name</FormLabel>
          <Input
            w={"60%"}
            borderColor={"gray.700"}
            {...register("firstName", { required: true })}
          />
        </FormControl>

        <FormControl isRequired display={"flex"} my={2}>
          <FormLabel w={"40%"}>Last Name</FormLabel>
          <Input
            w={"60%"}
            borderColor={"gray.700"}
            {...register("lastName", { required: true })}
          />
        </FormControl>

        <FormControl isRequired display={"flex"} my={2}>
          <FormLabel w={"40%"}>Bio</FormLabel>
          <Input
            w={"60%"}
            borderColor={"gray.700"}
            {...register("bio", { required: true })}
          />
        </FormControl>
        <Input
            hidden
            borderColor={"gray.700"}
            {...register("userId" )}
          />
          <Input
            hidden
            borderColor={"gray.700"}
            {...register("imageURL")}
          />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
