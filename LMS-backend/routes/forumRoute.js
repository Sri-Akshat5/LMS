const express = require("express");
const Forum = require("../models/Forum");
const router = express.Router();

// Create 
router.post("/create", async (req, res) => {
  try {
    const { courseId, title, description, createdBy } = req.body;

    if (!courseId || !title || !description || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const forum = new Forum({ courseId, title, description, createdBy });
    await forum.save();

    res.status(201).json({ message: "Discussion thread created!", forum });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Get
router.get("/course/:courseId", async (req, res) => {
  try {
    const forums = await Forum.find({ courseId: req.params.courseId }).populate("createdBy", "name");
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add Comment 
router.post("/comment/:forumId", async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!userId || !text) {
      return res.status(400).json({ message: "User ID and comment text are required" });
    }

    const forum = await Forum.findById(req.params.forumId);
    if (!forum) return res.status(404).json({ message: "Discussion thread not found!" });

    forum.comments.push({ userId, text });
    await forum.save();

    res.json({ message: "Comment added!", forum });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Comments 
router.get("/comments/:forumId", async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.forumId).populate("comments.userId", "name");
    if (!forum) return res.status(404).json({ message: "Discussion thread not found!" });

    res.json(forum.comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
