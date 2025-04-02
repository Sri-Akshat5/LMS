import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/revenue/revenue"; // Ensure this matches your backend route

export const getRevenue = async () => {
    try {
        const response = await axios.get(API_URL); // No double slashes (//)
        return response.data;
    } catch (error) {
        console.error("Error fetching revenue:", error);
        throw error;
    }
};
