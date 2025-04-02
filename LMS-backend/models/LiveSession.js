const mongoose = require("mongoose");

const LiveSessionSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sessionTitle: {
        type: String,
        required: true
    },
    sessionDate: {
        type: Date,
        required: true
    },
    sessionLink: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled"
    },
    chat: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model("LiveSession", LiveSessionSchema);
