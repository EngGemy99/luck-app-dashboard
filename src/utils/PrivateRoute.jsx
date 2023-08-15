import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  if (!token || decoded.role !== "admin") {
    navigate("/login");
    return null;
  }
  return <>{children}</>;
};
