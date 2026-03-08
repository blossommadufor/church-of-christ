import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle, faTimesCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "../../components/admin/AddMemberModal";
import { adminServices } from "../../services/adminServices";

const InfoRow = ({ label, value }) => (
    <div className="flex flex-col gap-0.5">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-primary font-semibold text-base">{value || "—"}</p>
    </div>
);

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" }) : "—";

const AdminMemberDetail = () => {
    // id is no longer strictly used for finding in dummyData since we pass user via location state
    const location = useLocation();

    // We expect the router link to pass the full `user` block containing `member`
    const user = location.state?.user;
    const userRole = user?.role || "MEMBER";
    const profile = user?.member || {};

    // Fallbacks if no attendance data exists yet
    const rawAttendance = profile.attendance || [];

    const years = useMemo(() => {
        if (!rawAttendance || !rawAttendance.length) return [];
        return [...new Set(rawAttendance.map((a) => a.date.split(",")[1]?.trim()))].sort((a, b) => b - a);
    }, [rawAttendance]);

    const [year, setYear] = useState(years[0] || "All");
    const [showEdit, setShowEdit] = useState(false);

    if (!user) return (
        <div className="text-center py-24">
            <p className="text-gray-400 text-xl font-semibold">Member details not available.</p>
            <p className="text-gray-500 text-sm mt-2">Please navigate here from the Members list.</p>
            <Link to="/admin/members" className="text-light font-semibold hover:underline mt-4 inline-block">← Back to Members</Link>
        </div>
    );

    const handleUpdate = async (updatedData) => {
        try {
            await adminServices.updateMember(user._id, updatedData);
            console.log("Successfully updated via API.");
            setShowEdit(false);
            // Dynamic refresh logic here eventually
        } catch (err) {
            console.error("Failed to update:", err);
        }
    };

    const attendance = year === "All" ? rawAttendance : rawAttendance.filter((a) => a.date.includes(year));
    const present = attendance.filter((a) => a.status === "Present").length;
    const missed = attendance.filter((a) => a.status === "Absent").length;
    const pct = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

    return (
        <div>
            {/* Header & Back */}
            <div className="flex items-center justify-between mb-6">
                <Link to="/admin/members" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-semibold text-base transition">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Members
                </Link>
                <button onClick={() => setShowEdit(true)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-light text-light font-semibold rounded-xl hover:bg-light hover:text-white transition text-sm">
                    <FontAwesomeIcon icon={faEdit} /> Edit Member
                </button>
            </div>

            {/* Profile header */}
            <div className="bg-primary rounded-2xl p-6 text-white mb-6 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase">
                    {profile.firstName?.charAt(0) || "M"}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-blue-300 text-sm capitalize">{profile.homeCongregation} Congregation</p>
                        <span className="bg-blue-400/20 text-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{userRole}</span>
                    </div>
                </div>
            </div>

            {/* Info grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-primary font-bold text-lg mb-5">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoRow label="Full Name" value={`${profile.firstName} ${profile.lastName}`} />
                    <InfoRow label="Phone Number" value={profile.phone} />
                    <InfoRow label="Email" value={profile.email} />
                    <InfoRow label="Address" value={profile.address} />
                    <InfoRow label="Date of Baptism" value={fmt(profile.dateBaptised)} />
                    <InfoRow label="Date Joined" value={fmt(profile.dateJoined)} />
                    <InfoRow label="Gender" value={<span className="capitalize">{profile.gender}</span>} />
                    <InfoRow label="Home Congregation" value={profile.homeCongregation} />
                    <InfoRow label="Marital Status" value={<span className="capitalize">{profile.maritalStatus}</span>} />
                    <InfoRow label="Occupation" value={profile.occupation} />
                    <InfoRow label="ID Card Number" value={profile.idCardNumber} />
                    <InfoRow label="Ministries" value={profile.ministries?.join(", ")} />
                </div>
            </div>

            {/* Next of Kin */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-primary font-bold text-lg mb-5">Next of Kin Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoRow label="Name" value={profile.nextOfKin?.name} />
                    <InfoRow label="Phone" value={profile.nextOfKin?.phone} />
                    <InfoRow label="Address" value={profile.nextOfKin?.address} />
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
            {showEdit && <AddMemberModal onClose={() => setShowEdit(false)} onAdd={handleUpdate} />}
        </div>
    );
};

export default AdminMemberDetail;
