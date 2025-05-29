import { useNavigate } from "react-router-dom";
import { logoutUser } from "../data/logoutUser";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      navigate("/");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
