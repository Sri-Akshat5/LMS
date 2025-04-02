import { useEffect, useState } from "react";
import { getAssignments, addAssignment, deleteAssignment } from "../services/assignmentService";

const ManageAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [newAssignment, setNewAssignment] = useState({ title: "", description: "" });

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        const data = await getAssignments();
        setAssignments(data);
    };

    const handleAddAssignment = async () => {
        await addAssignment(newAssignment);
        setNewAssignment({ title: "", description: "" });
        fetchAssignments();
    };

    const handleDeleteAssignment = async (assignmentId) => {
        await deleteAssignment(assignmentId);
        fetchAssignments();
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Manage Assignments</h1>

            {/* Add Assignment Form */}
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Title"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddAssignment} className="bg-green-500 text-white px-4 py-2 rounded">
                    Add Assignment
                </button>
            </div>

            {/* Assignment List */}
            <div className="grid grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                    <div key={assignment._id} className="border p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold">{assignment.title}</h2>
                        <p>{assignment.description}</p>
                        <button
                            onClick={() => handleDeleteAssignment(assignment._id)}
                            className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAssignments;
