import { useEffect, useState } from "react";
import { getDiscussions, deleteDiscussion } from "../services/discussionService";

const ManageDiscussions = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        const data = await getDiscussions();
        setDiscussions(data);
    };

    const handleDeleteDiscussion = async (discussionId) => {
        await deleteDiscussion(discussionId);
        fetchDiscussions();
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Manage Discussions</h1>

            {/* Discussion List */}
            <div className="grid grid-cols-1 gap-4">
                {discussions.map((discussion) => (
                    <div key={discussion._id} className="border p-4 rounded shadow-lg">
                        <h2 className="text-xl font-bold">{discussion.title}</h2>
                        <p>{discussion.content}</p>
                        <button
                            onClick={() => handleDeleteDiscussion(discussion._id)}
                            className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageDiscussions;
