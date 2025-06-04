import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../data/logoutUser";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleLogout = async () => {
    setIsLoading(true);
    const success = await logoutUser();
    setIsLoading(false);
    if (success) {
      navigate("/");
    } else {
      toast({
        status: "error",
        description: "Please try again",
        title: "Logout Failed",
        duration: 3000,
      });
    }
  };

  return (
    <Button
      colorScheme="red"
      variant="solid"
      size="sm"
      w={"100%"}
      onClick={handleLogout}
      isLoading={isLoading}
      loadingText="Logging out..."
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
