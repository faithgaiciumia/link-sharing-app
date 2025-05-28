import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //get the csrf token
      const csrfResponse = await fetch("http://localhost:4000/auth/csrf", {
        credentials: "include",
      });
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;
      //save email and csrf as key-value pairs
      const formBody = new URLSearchParams();
      formBody.append("email", email);
      formBody.append("csrfToken", csrfToken);
      formBody.append("callbackUrl", "http://localhost:5173");
      console.log("formbody is:", formBody.toString());
      //make THE request
      const res = await fetch("http://localhost:4000/auth/signin/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formBody.toString(),
      });
      if (res.ok) {
        console.log("magic link sent");
      } else {
        const error = await res.text();
        console.error("Error sending link:", error);
      }
    } catch (error) {
      console.error("Something went wrong. ", error);
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Box>
  );
}
