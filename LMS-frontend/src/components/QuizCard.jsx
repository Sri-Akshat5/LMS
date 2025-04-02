import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
    if (!quiz || !quiz._id) return null; // Prevent errors if data is missing

    return (
        <div className="border p-4 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
            <p className="text-gray-600 truncate">{quiz.description || "No description available."}</p>
            <Link
                to={`/quiz/${quiz._id}`}
                className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                aria-label={`Start quiz: ${quiz.title}`}
            >
                Start Quiz
            </Link>
        </div>
    );
};

export default QuizCard;
