import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard"; // Import the AssignmentCard component
import { getUserAssignments } from "../services/assignmentService"; // API call function

const MyAssignments = ({ user }) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getUserAssignments(user._id);
                setAssignments(data);
            } catch (err) {
                setError("Failed to load assignments.");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [user._id]);

    return (
        <div className="p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-semibold mb-2">Assignments</h2>
            <p className="text-gray-600">Track your assignments and submissions.</p>

            {loading && <p className="text-blue-500 mt-3">Loading assignments...</p>}
            {error && <p className="text-red-500 mt-3">{error}</p>}

            <div className="mt-4 space-y-4">
                {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                        <AssignmentCard 
                            key={assignment._id} 
                            assignment={assignment} 
                            user={user} 
                            refreshAssignments={() => {}}
                        />
                    ))
                ) : (
                    !loading && <p className="text-gray-500">No assignments found.</p>
                )}
            </div>
        </div>
    );
};

export default MyAssignments;
