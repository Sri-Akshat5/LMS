import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold">{quiz.title}</h3>
            <p className="text-gray-600">{quiz.description}</p>
            <Link
                to={`/quiz/${quiz._id}`}
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Start Quiz
            </Link>
        </div>
    );
};

export default QuizCard;
