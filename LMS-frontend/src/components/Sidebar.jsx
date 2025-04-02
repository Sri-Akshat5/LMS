import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const navigate = useNavigate(); // Initialize navigation function
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Check localStorage for user role
        if (localStorage.getItem("admin")) {
            setUserRole("admin");
        } else if (localStorage.getItem("student")) {
            setUserRole("student");
        } else {
            setUserRole(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove authentication token
        localStorage.removeItem("student"); // Remove student data
        localStorage.removeItem("admin"); // Remove admin data
        setUserRole(null); // Reset user role state
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
            <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
            <ul className="flex-grow">
                <li className="mb-3">
                    <Link
                        to={userRole === "admin" ? "/admin/dashboard" : "/dashboard"}
                        className="block p-3 rounded hover:bg-gray-700"
                    >
                        Home
                    </Link>
                </li>

                {/* Student Links */}
                {userRole === "student" && (
                    <>
                        <li className="mb-3">
                            <Link to="/student/courses" className="block p-3 rounded hover:bg-gray-700">
                               Courses
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/student/quizzes" className="block p-3 rounded hover:bg-gray-700">
                                Quizzes
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/student/assignments" className="block p-3 rounded hover:bg-gray-700">
                                Assignments
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/student/discussions" className="block p-3 rounded hover:bg-gray-700">
                                Discussion Forum
                            </Link>
                        </li>
                    </>
                )}

                {/* Admin Links */}
                {userRole === "admin" && (
                    <>
                        <li className="mb-3">
                            <Link to="/admin/manage-courses" className="block p-3 rounded hover:bg-gray-700">
                                Manage Courses
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/admin/manage-students" className="block p-3 rounded hover:bg-gray-700">
                                Manage Students
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/admin/revenue" className="block p-3 rounded hover:bg-gray-700">
                                Revenue Tracking
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/admin/manage-quizzes" className="block p-3 rounded hover:bg-gray-700">
                                Manage Quizzes
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/admin/manage-assignments" className="block p-3 rounded hover:bg-gray-700">
                                Manage Assignment
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            {/* Logout Button (Only if User is Logged In) */}
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
