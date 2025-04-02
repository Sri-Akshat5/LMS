const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
    },
  description: {
    type: String, 
    required: true 
    },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
  price: {
    type: Number,
    default: 0 
    },  
  enrolledStudents: [
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }], 
  lessons: [
    {
      title: String,
      content: String,
      videoUrl: String,
    },
  ],
  createdAt: {
    type: Date, 
    default: Date.now 
    },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected"], 
      default: "pending" 
    }
});

module.exports = mongoose.model("Course", CourseSchema);
