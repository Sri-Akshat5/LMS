const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
});

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", required: true
    },
    questions: [QuestionSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Quiz", QuizSchema);
