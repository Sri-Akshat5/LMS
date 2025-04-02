import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!formData.name.trim()) return "Name is required.";
        if (!formData.email.trim()) return "Email is required.";
        if (!formData.password.trim()) return "Password is required.";
        if (formData.password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const result = await dispatch(registerUser(formData)).unwrap();
            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.message || "Registration failed.");
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-xl w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <input 
                    className="border border-gray-300 p-2 w-full mb-3 rounded" 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    onChange={handleChange} 
                    value={formData.name} 
                    required 
                />
                <input 
                    className="border border-gray-300 p-2 w-full mb-3 rounded" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    value={formData.email} 
                    required 
                />
                <input 
                    className="border border-gray-300 p-2 w-full mb-3 rounded" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    value={formData.password} 
                    required 
                />

                <button 
                    className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-700 transition" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
