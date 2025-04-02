import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

const Sidebar = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Determine user role from localStorage
        const admin = localStorage.getItem("admin");
        const student = localStorage.getItem("student");

        if (admin) {
            setUserRole("admin");
        } else if (student) {
            setUserRole("student");
        } else {
            setUserRole(null);
        }
    }, []);

    const handleLogout = () => {
        // Clear all relevant user data from localStorage
        ["token", "student", "admin"].forEach((key) => localStorage.removeItem(key));
        setUserRole(null);
        navigate("/");
    };

    // Memoize the sidebar links based on the role
    const menuLinks = useMemo(() => {
        if (userRole === "student") {
            return [
                { path: "/student/courses", label: "Courses" },
                { path: "/student/quizzes", label: "Quizzes" },
                { path: "/student/assignments", label: "Assignments" },
                { path: "/student/discussions", label: "Discussion Forum" },
            ];
        }
        if (userRole === "admin") {
            return [
                { path: "/admin/manage-courses", label: "Manage Courses" },
                { path: "/admin/manage-students", label: "Manage Students" },
                { path: "/admin/revenue", label: "Revenue Tracking" },
                { path: "/admin/manage-quizzes", label: "Manage Quizzes" },
                { path: "/admin/manage-assignments", label: "Manage Assignments" },
            ];
        }
        return [];
    }, [userRole]);

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
            <h2 className="text-2xl font-bold mb-5">Dashboard</h2>

            {/* Display a message if no user is logged in */}
            {!userRole ? (
                <p className="text-gray-400 text-sm">Please log in to access the dashboard.</p>
            ) : (
                <ul className="flex-grow">
                    <li className="mb-3">
                        <Link
                            to={userRole === "admin" ? "/admin/dashboard" : "/dashboard"}
                            className="block p-3 rounded hover:bg-gray-700 transition"
                        >
                            Home
                        </Link>
                    </li>

                    {/* Dynamically Render Sidebar Links */}
                    {menuLinks.map(({ path, label }) => (
                        <li key={path} className="mb-3">
                            <Link to={path} className="block p-3 rounded hover:bg-gray-700 transition">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Logout Button */}
            {userRole && (
                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-600 p-3 rounded hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Sidebar;
