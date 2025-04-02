import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/api/students";

export const userAccount = async function(){
    try{
        const token = localStorage.getItem("token");  

        const decoded = JSON.parse(atob(token.split(".")[1])); 
        const userId = decoded.userId;

        if (!token) return { success: false, message: "No token found" };

        const response = await axios.get(`${API_URL}/${userId}`, { headers: { Authorization: `Bearer ${token}` } 
        });
        console.log("Fetched User Data:", response.data);
        return {success: true, name: response.data.name, email: response.data.email};
        
        
    } catch(error) {
        return {success: false, message: error.response?.data?.error || "Invalid account"};
    }
}

