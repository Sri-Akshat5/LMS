import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null); // Track error messages
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors on submission

        try {
            const result = await dispatch(registerUser(formData)).unwrap(); // Unwrap to handle errors
            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.message || "Registration failed.");
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
                <input className="border p-2 w-full mb-3" type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                <input className="border p-2 w-full mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input className="border p-2 w-full mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button className="bg-green-600 text-white p-2 w-full" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
