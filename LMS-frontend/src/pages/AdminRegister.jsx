import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice"; 
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Admin Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="border p-2 w-full rounded-lg" type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                    <input className="border p-2 w-full rounded-lg" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input className="border p-2 w-full rounded-lg" type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button className="bg-red-600 text-white p-2 w-full rounded-lg" type="submit">Register</button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <button onClick={() => navigate("/login")} className="text-blue-600 font-semibold">Login</button>
                </p>
            </div>
        </div>
    );
};

export default RegisterAdmin;
