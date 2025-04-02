const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    fileUrl: {
        type: String
    },
    submissions: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            submittedAt: {
                type: Date, default: Date.now
            },
            fileUrl: {
                type: String
            },
            grade: {
                type: Number,
                default: null
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
