import axios from "axios";

const API_URL = "http://localhost:5000/api/students/";

// Define functions first
const studentLogin = async function (email, password) {
    try {
        const response = await axios.post(`${API_URL}login`, { email, password });

        return {
            success: true,
            message: "Login Successful",
            token: response.data.token,
            student: response.data.student
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Login Failed!"
        };
    }
};

const studentRegister = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register`, userData);
        return response.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Registration Failed!" };
    }
};


export const getStudent = async () => {
    try {
        const response = await axios.get(`${API_URL}student`);
        return response.data;
    } catch (error) {
        console.error("Error fetching:", error);
        return [];
    }
};

// const userAccount = async function(){
//     try {
//         const token = localStorage.getItem("token");  
//         if (!token) return { success: false, message: "No token found" };

//         const response = await axios.get(`${API_URL}account`, { 
//             headers: { Authorization: `Bearer ${token}` } 
//         });

//         console.log("Fetched User Data:", response.data);

//         return { 
//             success: true, 
//             name: response.data.name, 
//             email: response.data.email 
//         };
        
//     } catch (error) {
//         return { success: false, message: error.response?.data?.error || "Invalid account" };
//     }
// };

// Export after defining functions
const authService = { studentLogin, studentRegister };
export default authService;
