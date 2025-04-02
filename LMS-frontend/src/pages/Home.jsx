import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Learning Platform</h1>
            <p className="text-lg text-gray-600 mb-6 text-center">
                A seamless experience for students and administrators to manage courses, quizzes, assignments, and discussions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">For Students</h2>
                    <p className="text-gray-600 mb-4">Access your courses, quizzes, and assignments.</p>
                    <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Student Login
                    </Link>
                </div>

                {/* Admin Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">For Admins</h2>
                    <p className="text-gray-600 mb-4">Manage courses, students, and content efficiently.</p>
                    <Link to="/admin-login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
