import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
