import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCheckCircle, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { adminStats, dummyMembers } from "../../data/adminDummyData";
import { adminServices } from "../../services/adminServices";

const StatCard = ({ icon, label, value, sub, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <FontAwesomeIcon icon={icon} className="text-xl text-white" />
        </div>
        <p className="text-gray-500 text-sm font-semibold">{label}</p>
        <p className="text-primary text-4xl font-bold">{value}</p>
        {sub && <p className="text-gray-400 text-xs">{sub}</p>}
    </div>
);

const AdminDashboard = () => {
    // Analytics API integration
    React.useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch analytics for today as requested
                const today = new Date().toISOString().split('T')[0];
                const res = await adminServices.getAnalytics(today);
                console.log("[API Analytics Response]:", res);
            } catch (err) {
                console.error("[API Analytics Error]:", err);
            }
        };
        fetchAnalytics();
    }, []);

    const recentActivity = dummyMembers
        .slice(0, 5)
        .map((m) => ({ name: m.name, date: m.attendance[0]?.date, status: m.attendance[0]?.status }));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 text-base mt-1">Welcome back, Admin. Here's an overview of the congregation.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                <StatCard icon={faUsers} label="Total Members" value={adminStats.totalMembers}
                    sub="Registered in the portal" color="bg-primary" />
                <StatCard icon={faCheckCircle} label="Total Attendances" value={adminStats.totalAttendances}
                    sub="Across all recorded Sundays" color="bg-green-500" />
                <StatCard icon={faCalendar} label="This Sunday" value={adminStats.thisSunday}
                    sub={`of ${adminStats.totalMembers} members present`} color="bg-light" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-primary font-bold text-lg">Recent Attendance</h2>
                    <Link to="/admin/members" className="text-light text-sm font-semibold hover:underline">View all members →</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-base">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-gray-500 font-semibold pb-3 pr-4">Member</th>
                                <th className="text-left text-gray-500 font-semibold pb-3 pr-4">Last Sunday</th>
                                <th className="text-left text-gray-500 font-semibold pb-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map((r, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="py-3 pr-4 font-semibold text-primary">{r.name}</td>
                                    <td className="py-3 pr-4 text-gray-500">{r.date}</td>
                                    <td className="py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status === "Present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
                                            }`}>{r.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
