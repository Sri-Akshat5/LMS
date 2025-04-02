import { useEffect, useState } from "react";
import { getStudent } from "../services/authService" // Ensure correct path
import axios from "axios";

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await getStudent();
            setStudents(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/student/${id}`);
            setStudents(students.filter((student) => student._id !== id));
        } catch (err) {
            console.error("Error deleting student:", err);
            alert("Failed to delete student");
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Manage Students</h1>

            {loading ? (
                <p>Loading students...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="text-center">
                                <td className="border border-gray-300 p-2">{student.name}</td>
                                <td className="border border-gray-300 p-2">{student.email}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleDelete(student._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageStudents;
