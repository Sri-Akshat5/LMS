import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/api/courses";

// Fetch all courses
export const getCourses = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Enroll in a course
export const enrollCourse = async (courseId, userId) => {
    const response = await axios.post(`${API_URL}/enroll`, { courseId, userId });
    return response.data;
};

// Add a new course (Admin)
export const addCourse = async (courseData) => {
    const response = await axios.post(API_URL, courseData);
    return response.data;
};

// Delete a course (Admin)
export const deleteCourse = async (courseId) => {
    const response = await axios.delete(`${API_URL}/${courseId}`);
    return response.data;
};
