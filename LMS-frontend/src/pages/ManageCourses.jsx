import { useEffect, useState } from "react";
import { getCourses, addCourse, deleteCourse } from "../services/courseService";

const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: "", description: "" });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    };

    const handleAddCourse = async () => {
        await addCourse(newCourse);
        setNewCourse({ title: "", description: "" });
        fetchCourses();
    };

    const handleDeleteCourse = async (courseId) => {
        await deleteCourse(courseId);
        fetchCourses();
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

            {/* Add Course Form */}
            <div className="mb-5">
                <input 
                    type="text" placeholder="Title" value={newCourse.title} 
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} 
                    className="border p-2 mr-2"
                />
                <input 
                    type="text" placeholder="Description" value={newCourse.description} 
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} 
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddCourse} className="bg-green-500 text-white px-4 py-2 rounded">
                    Add Course
                </button>
            </div>

            {/* Course List */}
            <div className="grid grid-cols-2 gap-4">
                {courses.map((course) => (
                    <div key={course._id} className="border p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold">{course.title}</h2>
                        <p className="text-gray-600">{course.description}</p>
                        <button 
                            onClick={() => handleDeleteCourse(course._id)} 
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

export default ManageCourses;
