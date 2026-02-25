import { Navigate } from "react-router-dom";

function PrivateRouteUser({ children }) {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" />
}

export default PrivateRouteUser;