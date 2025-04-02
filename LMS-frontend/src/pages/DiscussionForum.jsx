import { useEffect, useState } from "react";
import { getDiscussions, addDiscussion } from "../services/discussionService";
import DiscussionPost from "../components/DiscussionPost";
import { useSelector } from "react-redux";

const DiscussionForum = () => {
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: "", content: "" });
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        const data = await getDiscussions();
        setDiscussions(data);
    };

    const handleAddDiscussion = async () => {
        if (!newDiscussion.title || !newDiscussion.content) return;
        await addDiscussion({ ...newDiscussion, user: user.name });
        setNewDiscussion({ title: "", content: "" });
        fetchDiscussions();
    };

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Discussion Forum</h1>

            {/* Create Discussion Post */}
            <div className="mb-5 bg-white p-4 shadow-md rounded-lg">
                <input
                    type="text"
                    placeholder="Title"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                    className="border p-2 w-full rounded mb-2"
                />
                <textarea
                    placeholder="Your Question..."
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                    className="border p-2 w-full rounded mb-2 h-24 resize-none"
                />
                <button
                    onClick={handleAddDiscussion}
                    className={`w-full bg-green-500 text-white px-4 py-2 rounded ${
                        (!newDiscussion.title || !newDiscussion.content) && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!newDiscussion.title || !newDiscussion.content}
                >
                    Post Discussion
                </button>
            </div>

            {/* Discussion Posts */}
            <div className="grid grid-cols-1 gap-4">
                {discussions.length === 0 ? (
                    <p className="text-gray-600 text-center">No discussions available. Be the first to start one!</p>
                ) : (
                    discussions.map((discussion) => (
                        <DiscussionPost
                            key={discussion._id}
                            discussion={discussion}
                            user={user}
                            refreshDiscussions={fetchDiscussions}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default DiscussionForum;
