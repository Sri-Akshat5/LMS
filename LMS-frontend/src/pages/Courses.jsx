import { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import { useSelector } from "react-redux";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
            <div className="grid grid-cols-3 gap-4">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} user={user} refreshCourses={fetchCourses} />
                ))}
            </div>
        </div>
    );
};

export default Courses;
