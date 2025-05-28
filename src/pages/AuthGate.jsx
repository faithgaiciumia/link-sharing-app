/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSession } from "../data/fetchSession";
import Loader from "../components/Loader";

/* eslint-disable react/prop-types */
export default function AuthGate({children}){
    //check for already logged in users
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const session = await fetchSession();
      if (session?.user?.email) {
        navigate("/home");
      } else {
        setChecking(false);
      }
    };
    loadUser();
  }, []);
  if(checking){
    return <Loader/>;
  }
  return children;
}