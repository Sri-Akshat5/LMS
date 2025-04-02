const MyCourses = ({ courses }) => {
    return (
        <div className="p-4 bg-gray-200 rounded">
            <h2 className="text-xl font-semibold">My Courses</h2>
            <ul className="mt-2">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <li key={index} className="text-gray-600">{course}</li>
                    ))
                ) : (
                    <p className="text-gray-500">No courses enrolled yet.</p>
                )}
            </ul>
        </div>
    );
};

export default MyCourses;
