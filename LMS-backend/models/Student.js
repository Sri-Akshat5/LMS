const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Student", StudentSchema);
