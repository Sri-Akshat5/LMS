import { useState } from "react";
import { enrollCourse } from "../services/courseService";

const CourseCard = ({ course, user, refreshCourses }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleEnroll = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await enrollCourse(course._id, user._id);
            setSuccess("Successfully enrolled in the course!");
            refreshCourses();
        } catch (err) {
            setError("Enrollment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-4 rounded shadow-lg bg-white">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            <button 
                onClick={handleEnroll} 
                className={`mt-3 px-4 py-2 rounded text-white ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
            >
                {loading ? "Enrolling..." : "Enroll"}
            </button>
        </div>
    );
};

export default CourseCard;
