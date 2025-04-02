import { useEffect, useState } from "react";
import { getQuizzes, addQuiz, deleteQuiz } from "../services/quizService";

const ManageQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({ title: "", questions: [] });

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const data = await getQuizzes();
        setQuizzes(data);
    };

    const handleAddQuiz = async () => {
        await addQuiz(newQuiz);
        setNewQuiz({ title: "", questions: [] });
        fetchQuizzes();
    };

    const handleDeleteQuiz = async (quizId) => {
        await deleteQuiz(quizId);
        fetchQuizzes();
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Manage Quizzes</h1>

            {/* Add Quiz Form */}
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Title"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddQuiz} className="bg-green-500 text-white px-4 py-2 rounded">
                    Add Quiz
                </button>
            </div>

            {/* Quiz List */}
            <div className="grid grid-cols-2 gap-4">
                {quizzes.map((quiz) => (
                    <div key={quiz._id} className="border p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold">{quiz.title}</h2>
                        <button
                            onClick={() => handleDeleteQuiz(quiz._id)}
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

export default ManageQuizzes;
