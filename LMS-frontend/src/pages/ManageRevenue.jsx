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
        try {
            setLoading(true);
            const data = await getRevenue();
            console.log(data);
            setRevenueData(data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch revenue data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Revenue Management</h1>

            {loading ? (
                <p>Loading revenue data...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Course</th>
                            <th className="border border-gray-300 p-2">Tutor</th>
                            <th className="border border-gray-300 p-2">Total Earnings</th>
                            <th className="border border-gray-300 p-2">Commission</th>
                            <th className="border border-gray-300 p-2">Net Earnings</th>
                            <th className="border border-gray-300 p-2">Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenueData.map((entry) => (
                            <tr key={entry._id} className="text-center">
                                <td className="border border-gray-300 p-2">{entry.courseId?.title || "N/A"}</td>
                                <td className="border border-gray-300 p-2">{entry.tutorId?.name || "N/A"}</td>
                                <td className="border border-gray-300 p-2">Rs. {entry.totalEarnings.toFixed(2)}</td>
                                <td className="border border-gray-300 p-2">Rs. {entry.commission.toFixed(2)}</td>
                                <td className="border border-gray-300 p-2 font-semibold">Rs. {entry.netEarnings.toFixed(2)}</td>
                                <td className="border border-gray-300 p-2">
                                    {entry.transactions.length > 0 ? (
                                        <ul>
                                            {entry.transactions.map((txn, index) => (
                                                <li key={index}>
                                                    Rs. {txn.amount.toFixed(2)} on {new Date(txn.date).toLocaleDateString()}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "No Transactions"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageRevenue;
