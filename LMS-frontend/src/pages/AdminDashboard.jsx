import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import ManageCourses from "../components/admin/ManageCourses";
import ManageStudents from "../components/admin/ManageStudents";
import RevenueTracking from "../components/admin/RevenueTracking";

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false); // Default to false

    useEffect(() => {
        // Fetch user role from localStorage (or API in a real app)
        const storedAdmin = localStorage.getItem("admin");
        setIsAdmin(storedAdmin === "true"); // Convert to boolean
    }, []);

    return (
        <div className="flex">
           
            <div className="flex-1 p-5">
                <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
                <p className="mt-2">Manage students, courses, and content.</p>

                {/* Admin Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    <ManageCourses />
                    <ManageStudents />
                    <RevenueTracking />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
