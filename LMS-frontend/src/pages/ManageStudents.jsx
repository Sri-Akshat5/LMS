import { useEffect, useState } from "react";
import { getStudent } from "../services/authService"; // Ensure correct path
import axios from "axios";

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getStudent();
            setStudents(data);
        } catch (err) {
            setError("Failed to fetch students. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/student/${id}`);
            setStudents((prev) => prev.filter((student) => student._id !== id));
        } catch (err) {
            console.error("Error deleting student:", err);
            alert("Failed to delete student. Please try again.");
        }
    };

    return (
        <div className="p-5 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-5 text-center">Manage Students</h1>

            {/* Error Handling */}
            {error && (
                <div className="text-center text-red-500 mb-4">
                    <p>{error}</p>
                    <button 
                        onClick={fetchStudents} 
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
                <p className="text-center text-gray-500">Loading students...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student._id} className="text-center hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{student.name}</td>
                                        <td className="border border-gray-300 p-2">{student.email}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                onClick={() => handleDelete(student._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center border border-gray-300 p-4 text-gray-500">
                                        No students available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageStudents;
