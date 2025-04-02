import { useState } from "react";
import { submitAssignment } from "../services/assignmentService";

const AssignmentCard = ({ assignment, user, refreshAssignments }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async () => {
        if (!file) return alert("Please select a file!");
        await submitAssignment(assignment._id, user._id, file);
        refreshAssignments();
    };

    return (
        <div className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{assignment.title}</h2>
            <p>{assignment.description}</p>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mt-2" />
            <button onClick={handleSubmit} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </div>
       
    );
};

export default AssignmentCard;
