import { useEffect, useState } from "react";
import { getQuizzes, addQuiz, deleteQuiz } from "../services/quizService";

const ManageQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({ title: "", questions: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        setIsLoading(true);
        try {
            const data = await getQuizzes();
            setQuizzes(data);
        } catch (err) {
            setError("Failed to load quizzes. Try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddQuiz = async () => {
        if (!newQuiz.title.trim()) {
            setError("Quiz title is required.");
            return;
        }

        try {
            await addQuiz(newQuiz);
            setNewQuiz({ title: "", questions: [] });
            fetchQuizzes();
        } catch (err) {
            setError("Failed to add quiz. Try again.");
        }
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            await deleteQuiz(quizId);
            setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
        } catch (err) {
            setError("Failed to delete quiz. Try again.");
        }
    };

    return (
        <div className="p-5 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Manage Quizzes</h1>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

            {/* Add Quiz Form */}
            <div className="mb-5 bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Add New Quiz</h2>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Quiz Title"
                        value={newQuiz.title}
                        onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                        className="border p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleAddQuiz}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Add Quiz
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && <p className="text-center text-gray-600">Loading quizzes...</p>}

            {/* Quiz List */}
            {!isLoading && quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizzes.map((quiz) => (
                        <div key={quiz._id} className="border p-4 rounded-lg shadow-md bg-white">
                            <h2 className="text-lg font-bold">{quiz.title}</h2>
                            <button
                                onClick={() => handleDeleteQuiz(quiz._id)}
                                className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !isLoading && <p className="text-center text-gray-500">No quizzes available.</p>
            )}
        </div>
    );
};

export default ManageQuizzes;
