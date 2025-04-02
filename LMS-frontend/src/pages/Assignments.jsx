import { useEffect, useState } from "react";
import { getAssignments } from "../services/assignmentService";
import AssignmentCard from "../components/AssignmentCard";
import { useSelector } from "react-redux";

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {
        const data = await getAssignments();
        console.log(data);
        setAssignments(data);
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Available Assignments</h1>

            {/* Empty State Message */}
            {assignments.length === 0 ? (
                <p className="text-gray-600 text-center">No assignments available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assignments.map((assignment) => (
                        <AssignmentCard 
                            key={assignment._id} 
                            assignment={assignment} 
                            user={user} 
                            refreshAssignments={fetchAssignments} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Assignments;
