/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSession } from "../data/fetchSession";
import Loader from "../components/Loader";
import { fetchCurrentUser } from "../data/fetchCurrentUser";

/* eslint-disable react/prop-types */
export default function AuthGate({ children }) {
  //check for already logged in users
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const session = await fetchSession();
      if (session?.user?.email) {
        //check if logged in user has a username
        const user = await fetchCurrentUser();
        if (!user || !user.username) {
          navigate("/setup-username");
          return;
        } else {
          navigate("/home");
          return;
        }
      } else {
        setChecking(false);
      }
    };
    loadUser();
  }, []);
  if (checking) {
    return <Loader />;
  }
  return children;
}
