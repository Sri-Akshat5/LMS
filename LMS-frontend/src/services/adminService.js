import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/api/auth/";

const adminLogin = async function (email, password) {
    try {
        const response = await axios.post(`${API_URL}login`, { email, password });

        return {
            success: true,
            message: "Login Successful",
            token: response.data.token,
            
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Login Failed!"
        };
    }
};



const adminService = { adminLogin };
export default adminService;