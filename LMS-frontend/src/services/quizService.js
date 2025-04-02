import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/quizzes/quizzes";

// Fetch all quizzes


export const getQuizzes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return [];
    }
};

// Submit a quiz
export const submitQuiz = async (quizId, userId, answers) => {
    const response = await axios.post(`${API_URL}/submit`, { quizId, userId, answers });
    return response.data;
};

// Add a new quiz (Admin)
export const addQuiz = async (quizData) => {
    const response = await axios.post(API_URL, quizData);
    return response.data;
};

// Delete a quiz (Admin)
export const deleteQuiz = async (quizId) => {
    const response = await axios.delete(`${API_URL}/${quizId}`);
    return response.data;
};
