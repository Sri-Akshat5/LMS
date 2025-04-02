import { useEffect, useState } from "react";
import { getCourses, addCourse, deleteCourse } from "../services/courseService";

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: "", description: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (err) {
            setError("Failed to load courses. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCourse = async () => {
        if (!newCourse.title.trim() || !newCourse.description.trim()) {
            setError("Title and description are required.");
            return;
        }

        try {
            await addCourse(newCourse);
            setNewCourse({ title: "", description: "" });
            fetchCourses();
        } catch (err) {
            setError("Failed to add course. Try again.");
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourse(courseId);
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
        } catch (err) {
            setError("Failed to delete course. Try again.");
        }
    };

    return (
        <div className="p-5 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Manage Courses</h1>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

            {/* Add Course Form */}
            <div className="mb-5 bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Add New Course</h2>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleAddCourse}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && <p className="text-center text-gray-600">Loading courses...</p>}

            {/* Course List */}
            {!isLoading && courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((course) => (
                        <div key={course._id} className="border p-4 rounded-lg shadow-md bg-white">
                            <h2 className="text-lg font-bold">{course.title}</h2>
                            <p className="text-gray-600">{course.description}</p>
                            <button
                                onClick={() => handleDeleteCourse(course._id)}
                                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !isLoading && <p className="text-center text-gray-500">No courses available.</p>
            )}
        </div>
    );
};

export default ManageCourses;
