import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, type }) => {
    const { user } = useSelector((state) => state.auth); // Admin
    const { student } = useSelector((state) => state.studentAuth); // Student

    // Redirect if neither admin nor student is authenticated
    if (!user && !student) return <Navigate to="/login" />;

    // If route is for admin but a student tries to access it
    if (type === "admin" && !user) return <Navigate to="/student/dashboard" />;

    // If route is for student but an admin tries to access it
    if (type === "student" && !student) return <Navigate to="/admin/dashboard" />;

    return children;
};

export default ProtectedRoute;
