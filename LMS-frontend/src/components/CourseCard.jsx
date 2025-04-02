import { enrollCourse } from "../services/courseService";

const CourseCard = ({ course, user, refreshCourses }) => {
    const handleEnroll = async () => {
        await enrollCourse(course._id, user._id);
        refreshCourses();
    };

    return (
        <div className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <button 
                onClick={handleEnroll} 
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Enroll
            </button>
        </div>
    );
};

export default CourseCard;
