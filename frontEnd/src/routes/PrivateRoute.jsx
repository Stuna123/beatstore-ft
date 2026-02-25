import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { isAuthentificated } = useAuth();

    return isAuthentificated ? children : <Navigate to="/login"/>
}

export default PrivateRoute