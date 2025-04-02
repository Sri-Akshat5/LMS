import { useState } from "react";
import { addComment } from "../services/discussionService";

const DiscussionPost = ({ discussion, refreshDiscussions, user }) => {
    const [comment, setComment] = useState("");

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
        await addComment(discussion._id, { text: comment, user: user.name });
        setComment("");
        refreshDiscussions();
    };

    return (
        <div className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{discussion.title}</h2>
            <p>{discussion.content}</p>
            <h3 className="mt-3 font-semibold">Comments:</h3>
            <ul>
                {discussion.comments.map((c, idx) => (
                    <li key={idx} className="border-b py-1">{c.user}: {c.text}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 mt-2 w-full"
            />
            <button onClick={handleCommentSubmit} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Comment
            </button>
        </div>
    );
};

export default DiscussionPost;
