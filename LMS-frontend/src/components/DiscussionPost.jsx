import { useState } from "react";
import { addComment } from "../services/discussionService";

const DiscussionPost = ({ discussion, refreshDiscussions, user }) => {
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCommentSubmit = async () => {
        if (!comment.trim()) return;
        
        setLoading(true);
        setError(null);

        try {
            await addComment(discussion._id, { text: comment, user: user.name });
            setComment("");
            refreshDiscussions();
        } catch (err) {
            setError("Failed to post comment. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-4 rounded shadow-lg bg-white">
            <h2 className="text-xl font-bold">{discussion.title}</h2>
            <p className="text-gray-600">{discussion.content}</p>

            <h3 className="mt-3 font-semibold">Comments:</h3>
            {discussion.comments.length > 0 ? (
                <ul className="mt-2">
                    {discussion.comments.map((c, idx) => (
                        <li key={idx} className="border-b py-1 text-gray-700">
                            <strong>{c.user}:</strong> {c.text}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-sm mt-2">No comments yet.</p>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="mt-3 flex">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border p-2 flex-1 rounded-l"
                    disabled={loading}
                />
                <button 
                    onClick={handleCommentSubmit} 
                    className={`px-4 py-2 rounded-r text-white ${
                        loading || !comment.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading || !comment.trim()}
                >
                    {loading ? "Posting..." : "Comment"}
                </button>
            </div>
        </div>
    );
};

export default DiscussionPost;
