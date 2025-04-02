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
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Discussion Forum</h1>

            {/* Create Discussion Post */}
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Title"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Your Question..."
                    value={newDiscussion.content}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddDiscussion} className="bg-green-500 text-white px-4 py-2 rounded">
                    Post
                </button>
            </div>

            {/* Discussion Posts */}
            <div className="grid grid-cols-1 gap-4">
                {discussions.map((discussion) => (
                    <DiscussionPost key={discussion._id} discussion={discussion} user={user} refreshDiscussions={fetchDiscussions} />
                ))}
            </div>
        </div>
    );
};

export default DiscussionForum;
