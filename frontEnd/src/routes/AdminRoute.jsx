import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { isAuthentificated, isAdmin } = useAuth();

    if (!isAuthentificated) return <Navigate to="/login" />
    if (!isAdmin) return <Navigate to="/" />

    return children;
}

export default AdminRoute
