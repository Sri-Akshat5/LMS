import { useEffect, useState } from "react";
import { getAssignments, addAssignment, deleteAssignment } from "../services/assignmentService";

const ManageAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState({ title: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        setIsLoading(true);
        try {
            const data = await getAssignments();
            setAssignments(data);
        } catch (err) {
            setError("Failed to load assignments. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAssignment = async () => {
        if (!newAssignment.title.trim() || !newAssignment.description.trim()) {
            setError("Title and description are required.");
            return;
        }

        try {
            await addAssignment(newAssignment);
            setNewAssignment({ title: "", description: "" });
            fetchAssignments();
        } catch (err) {
            setError("Failed to add assignment. Try again.");
        }
    };

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await deleteAssignment(assignmentId);
            setAssignments((prevAssignments) =>
                prevAssignments.filter((assignment) => assignment._id !== assignmentId)
            );
        } catch (err) {
            setError("Failed to delete assignment. Try again.");
        }
    };

    return (
        <div className="p-5 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Manage Assignments</h1>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

            {/* Add Assignment Form */}
            <div className="mb-5 bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Add New Assignment</h2>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                        className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleAddAssignment}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && <p className="text-center text-gray-600">Loading assignments...</p>}

            {/* Assignment List */}
            {!isLoading && assignments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assignments.map((assignment) => (
                        <div key={assignment._id} className="border p-4 rounded-lg shadow-md bg-white">
                            <h2 className="text-lg font-bold">{assignment.title}</h2>
                            <p className="text-gray-600">{assignment.description}</p>
                            <button
                                onClick={() => handleDeleteAssignment(assignment._id)}
                                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !isLoading && <p className="text-center text-gray-500">No assignments available.</p>
            )}
        </div>
    );
};

export default ManageAssignments;
