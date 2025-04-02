import { useEffect, useState } from "react";
import { getRevenue } from "../services/revenueService";

const ManageRevenue = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRevenue();
    }, []);

    const fetchRevenue = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRevenue();
            setRevenueData(data);
        } catch (err) {
            setError("Failed to fetch revenue data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-5 text-center">Revenue Management</h1>

            {/* Error Message with Retry */}
            {error && (
                <div className="text-center text-red-500 mb-3">
                    <p>{error}</p>
                    <button 
                        onClick={fetchRevenue} 
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
                <p className="text-center text-gray-500">Loading revenue data...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border border-gray-300 p-2">Course</th>
                                <th className="border border-gray-300 p-2">Tutor</th>
                                <th className="border border-gray-300 p-2">Total Earnings</th>
                                <th className="border border-gray-300 p-2">Commission</th>
                                <th className="border border-gray-300 p-2">Net Earnings</th>
                                <th className="border border-gray-300 p-2">Transactions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {revenueData.length > 0 ? (
                                revenueData.map((entry) => (
                                    <tr key={entry._id} className="text-center hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{entry.courseId?.title || "N/A"}</td>
                                        <td className="border border-gray-300 p-2">{entry.tutorId?.name || "N/A"}</td>
                                        <td className="border border-gray-300 p-2 font-medium">Rs. {entry.totalEarnings.toFixed(2)}</td>
                                        <td className="border border-gray-300 p-2 text-red-500">Rs. {entry.commission.toFixed(2)}</td>
                                        <td className="border border-gray-300 p-2 font-semibold text-green-600">Rs. {entry.netEarnings.toFixed(2)}</td>
                                        <td className="border border-gray-300 p-2">
                                            {entry.transactions.length > 0 ? (
                                                <ul className="list-disc list-inside text-sm text-gray-600">
                                                    {entry.transactions.map((txn, index) => (
                                                        <li key={index}>
                                                            Rs. {txn.amount.toFixed(2)} on {new Date(txn.date).toLocaleDateString()}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="text-gray-500">No Transactions</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center border border-gray-300 p-4 text-gray-500">
                                        No revenue data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageRevenue;
