import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
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

        // Basic validation
        if (!email || !password) {
            setError("Email and Password are required.");
            setIsLoading(false);
            return;
        }

        const result = await authService.studentLogin(email, password);

        if (result.success) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("student", JSON.stringify(result.student)); 
            setStatus("Login successful!");
            setTimeout(() => navigate("/dashboard"), 1000);
        } else {
            setError(result.message || "Invalid credentials. Try again.");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-semibold text-center text-gray-700">Welcome Back</h2>
                <p className="text-sm text-gray-500 text-center mb-4">Sign in to continue</p>

                {/* Error & Success Messages */}
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                {status && <p className="text-green-500 text-center mb-2">{status}</p>}

                {/* Login Form */}
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
                        className={`w-full text-white font-semibold p-3 rounded-lg transition duration-300 ${
                            isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Footer Section */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        Don't have an account? <span className="text-blue-600 font-semibold">Contact the Admin</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
