import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Preview from "./pages/Preview";
import Landing from "./pages/Landing";
import theme from "./theme";
import Signin from "./pages/Signin";
import AuthGate from "./pages/AuthGate";
import SetupUsername from "./pages/SetupUsername";
import PublicUserPage from "./pages/PublicUserPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGate>
                <Landing />
              </AuthGate>
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:username" element={<PublicUserPage />} /> 
          <Route path="/setup-username" element={<SetupUsername />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
