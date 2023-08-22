import jwtDecode from "jwt-decode";
import { Navigate } from "react-router";
function PrivateRoute(props) {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.role == "admin") {
      return props.children;
    }
  }
  return <Navigate to="/login" />;
}

export default PrivateRoute;
