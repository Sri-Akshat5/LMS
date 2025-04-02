import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/api/assignments/assignment";

// Fetch all assignments


export const getAssignments = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return [];
    }
};

// Submit an assignment
export const submitAssignment = async (assignmentId, userId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", assignmentId);
    formData.append("userId", userId);

    const response = await axios.post(`${API_URL}/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

// Add a new assignment (Admin)
export const addAssignment = async (assignmentData) => {
    const response = await axios.post(API_URL, assignmentData);
    return response.data;
};

// Delete an assignment (Admin)
export const deleteAssignment = async (assignmentId) => {
    const response = await axios.delete(`${API_URL}/${assignmentId}`);
    return response.data;
};
