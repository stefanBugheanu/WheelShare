import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export default function LogoutHandler() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth) return;
  const { user, token, logout } = useAuth();

  useEffect(() => {
    let timer;

    if (user && token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          logout();
          navigate("/");
        } else {
          const timeLeft = (decoded.exp - currentTime) * 1000;
          timer = setTimeout(() => {
            logout();
            navigate("/");
          }, timeLeft);
        }
      } catch (err) {
        logout();
        navigate("/");
      }
    }

    return () => clearTimeout(timer);
  }, [user, token]);

  return null;
}
