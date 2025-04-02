import { useEffect, useState } from "react";
import { getQuizzes } from "../services/quizService";
import QuizCard from "../components/QuizCard";
import { useSelector } from "react-redux";

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const data = await getQuizzes();
            console.log(data);
            setQuizzes(data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
            <div className="grid grid-cols-3 gap-4">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <QuizCard key={quiz._id} quiz={quiz} user={user} refreshQuizzes={fetchQuizzes} />
                    ))
                ) : (
                    <p className="text-gray-500">No quizzes available.</p>
                )}
            </div>
        </div>
    );
};

export default Quizzes;
