import { useEffect, useState } from "react";
import { getQuizzes } from "../services/quizService";
import QuizCard from "../components/QuizCard";
import { useSelector } from "react-redux";

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getQuizzes();
            setQuizzes(data);
        } catch (err) {
            setError("Failed to fetch quizzes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Available Quizzes</h1>

            {/* Error Handling */}
            {error && (
                <div className="text-center text-red-500 mb-4">
                    <p>{error}</p>
                    <button 
                        onClick={fetchQuizzes} 
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <p className="text-center text-gray-500">Loading quizzes...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <QuizCard key={quiz._id} quiz={quiz} user={user} refreshQuizzes={fetchQuizzes} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center col-span-full">No quizzes available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quizzes;
