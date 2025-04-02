import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import adminService from "../services/adminService";

const adminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setStatus("");

        try {
            const result = await adminService.adminLogin(email, password);

            if (result.success) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("admin", JSON.stringify(result.admin)); 
                
                setStatus("Login successful!");

                setTimeout(() => navigate("/admin/dashboard"), 1000);
            } else {
                setError(result?.message || "Invalid email or password.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Welcome Back</h2>
                <p className="text-sm text-gray-500 text-center mb-4">Sign in to continue</p>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {status && <p className="text-green-500 text-center">{status}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Don't have an account? Contact to Admin 
                        
                    </p>
                </div>
            </div>
        </div>
    );
};

export default adminLogin;
