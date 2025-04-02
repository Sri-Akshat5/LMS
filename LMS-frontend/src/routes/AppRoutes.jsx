import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/Login";
import AdminLogin from "../pages/adminLogin";
import Register from "../pages/Register";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Courses from "../pages/Courses";
import ManageCourses from "../pages/ManageCourses";
import Quizzes from "../pages/Quizzes";
import ManageQuizzes from "../pages/ManageQuizzes";
import Assignments from "../pages/Assignments";
import ManageAssignments from "../pages/ManageAssignments";
import DiscussionForum from "../pages/DiscussionForum";
import ManageDiscussions from "../pages/ManageDiscussions";
import Home from "../pages/Home";
import RegisterAdmin from "../pages/AdminRegister";
import Sidebar from "../components/Sidebar";
import ManageStudents from "../pages/ManageStudents";
import ManageRevenue from "../pages/ManageRevenue";

const AppRoutes = () => {
    return (
        <Router>
            <MainLayout />
        </Router>
    );
};

const MainLayout = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const location = useLocation();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [location]);

    const sidebarPaths = [
        "/dashboard",
        "/student/courses",
        "/student/quizzes",
        "/student/assignments",
        "/student/discussions",
        "/admin/dashboard",
        "/admin/manage-courses",
        "/admin/manage-students",
        "/admin/manage-quizzes",
        "/admin/revenue",
        "/admin/manage-assignments",
        "/admin/manage-discussions",
        "/admin/register-admin",
    ];

    const showSidebar = token && sidebarPaths.includes(location.pathname);

    return (
        <div className="flex">
            {showSidebar && <Sidebar />}
            <div className="flex-1">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Student Routes */}
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/courses" element={<Courses />} />
                    <Route path="/student/quizzes" element={<Quizzes />} />
                    <Route path="/student/assignments" element={<Assignments />} />
                    <Route path="/student/discussions" element={<DiscussionForum />} />

                    {/* Protected Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/manage-courses" element={<ManageCourses />} />
                    <Route path="/admin/manage-students" element={<ManageStudents />} />
                    <Route path="/admin/manage-quizzes" element={<ManageQuizzes />} />
                    <Route path="/admin/revenue" element={<ManageRevenue />} />
                    <Route path="/admin/manage-assignments" element={<ManageAssignments />} />
                    <Route path="/admin/manage-discussions" element={<ManageDiscussions />} />
                    <Route path="/admin/register-admin" element={<RegisterAdmin />} />
                </Routes>
            </div>
        </div>
    );
};

export default AppRoutes;
