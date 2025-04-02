import axios from "axios";

const API_URL = "https://lms-zb0x.onrender.com/api/discussions";

// Fetch all discussions
export const getDiscussions = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new discussion post
export const addDiscussion = async (postData) => {
    const response = await axios.post(API_URL, postData);
    return response.data;
};

// Add a comment to a discussion
export const addComment = async (discussionId, commentData) => {
    const response = await axios.post(`${API_URL}/${discussionId}/comment`, commentData);
    return response.data;
};

// Delete a discussion (Admin)
export const deleteDiscussion = async (discussionId) => {
    const response = await axios.delete(`${API_URL}/${discussionId}`);
    return response.data;
};
