import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { dummyMembers } from "../../data/adminDummyData";

const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-0.5">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-primary font-semibold text-base">{value || "—"}</p>
    </div>
);

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" }) : "—";

const AdminMemberDetail = () => {
    const { id } = useParams();
    const member = dummyMembers.find((m) => String(m.id) === String(id));

    const years = useMemo(() => {
        if (!member) return [];
        return [...new Set(member.attendance.map((a) => a.date.split(",")[1]?.trim()))].sort((a, b) => b - a);
    }, [member]);

    const [year, setYear] = useState(years[0] || "All");

    if (!member) return (
        <div className="text-center py-24">
            <p className="text-gray-400 text-xl font-semibold">Member not found.</p>
            <Link to="/admin/members" className="text-light font-semibold hover:underline mt-3 inline-block">← Back to Members</Link>
        </div>
    );

    const attendance = year === "All" ? member.attendance : member.attendance.filter((a) => a.date.includes(year));
    const present = attendance.filter((a) => a.status === "Present").length;
    const missed = attendance.filter((a) => a.status === "Absent").length;
    const pct = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

    return (
        <div>
            {/* Back */}
            <Link to="/admin/members" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-semibold text-base mb-6 transition">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Members
            </Link>

            {/* Profile header */}
            <div className="bg-primary rounded-2xl p-6 text-white mb-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    {member.name.charAt(0)}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{member.name}</h1>
                    <p className="text-blue-300 text-sm">{member.homeCongregation} Congregation</p>
                </div>
            </div>

            {/* Info grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-primary font-bold text-lg mb-5">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoRow label="Full Name" value={member.name} />
                    <InfoRow label="Phone Number" value={member.phone} />
                    <InfoRow label="Email" value={member.email} />
                    <InfoRow label="Address" value={member.address} />
                    <InfoRow label="Date of Baptism" value={fmt(member.dateOfBaptism)} />
                    <InfoRow label="Date of Birth" value={fmt(member.dateOfBirth)} />
                    <InfoRow label="Gender" value={member.gender} />
                    <InfoRow label="Home Congregation" value={member.homeCongregation} />
                </div>
            </div>

            {/* Attendance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-primary font-bold text-lg">Attendance History</h2>
                        <p className="text-gray-500 text-sm mt-0.5">
                            {present} present · {missed} absent · <span className={`font-bold ${pct >= 75 ? "text-green-500" : "text-orange-400"}`}>{pct}% attendance</span>
                        </p>
                    </div>
                    <select value={year} onChange={(e) => setYear(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 text-sm font-semibold outline-none focus:border-light transition">
                        <option value="All">All Years</option>
                        {years.map((y) => <option key={y}>{y}</option>)}
                    </select>
                </div>

                {/* Summary badges */}
                <div className="flex gap-3 mb-5 flex-wrap">
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                        <FontAwesomeIcon icon={faCheckCircle} /> {present} Present
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-bold">
                        <FontAwesomeIcon icon={faTimesCircle} /> {missed} Absent
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left text-gray-500 font-semibold px-5 py-3">Date (Sunday)</th>
                                <th className="text-left text-gray-500 font-semibold px-5 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((a, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="px-5 py-3 text-gray-700 font-medium">{a.date}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${a.status === "Present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-400"
                                            }`}>{a.status}</span>
                                    </td>
                                </tr>
                            ))}
                            {attendance.length === 0 && (
                                <tr><td colSpan={2} className="text-center py-10 text-gray-400">No attendance records found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminMemberDetail;
