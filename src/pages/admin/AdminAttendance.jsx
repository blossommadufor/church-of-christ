import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUsers, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { dummyMembers } from "../../data/adminDummyData";

// Build a map: sunday date → list of members present/absent
const buildAttendanceMap = () => {
    const map = {};
    dummyMembers.forEach((member) => {
        member.attendance.forEach(({ date, status }) => {
            if (!map[date]) map[date] = { present: [], absent: [] };
            if (status === "Present") map[date].present.push(member);
            else map[date].absent.push(member);
        });
    });
    return Object.entries(map).sort((a, b) => new Date(b[0]) - new Date(a[0]));
};

const AdminAttendance = () => {
    const rows = useMemo(buildAttendanceMap, []);
    const [selected, setSelected] = useState(null);
    const [view, setView] = useState("present"); // "present" | "absent"

    const handleSelect = (data) => {
        setView("present"); // reset to Present tab when switching Sunday
        setSelected(data);
    };

    if (selected) {
        const viewData = view === "present" ? selected.present : selected.absent;

        return (
            <div>
                <button
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-semibold text-base mb-6 transition"
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Attendance
                </button>

                <div className="mb-6">
                    <h1 className="text-primary text-2xl font-bold">{selected.date}</h1>
                    <p className="text-gray-500 text-base mt-1">
                        {selected.present.length} present · {selected.absent.length} absent
                    </p>
                </div>

                {/* Toggle pills */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    <button
                        onClick={() => setView("present")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition ${view === "present"
                            ? "bg-green-500 text-white shadow-sm"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} /> Present ({selected.present.length})
                    </button>
                    <button
                        onClick={() => setView("absent")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition ${view === "absent"
                            ? "bg-red-500 text-white shadow-sm"
                            : "bg-red-50 text-red-500 hover:bg-red-100"
                            }`}
                    >
                        <FontAwesomeIcon icon={faUsers} /> Absent ({selected.absent.length})
                    </button>
                </div>

                {/* Single table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-primary font-bold text-lg">
                            Members {view === "present" ? "Present" : "Absent"}
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    {["#", "Name", "Phone", "Email"].map((h) => (
                                        <th key={h} className="text-left text-gray-500 font-semibold px-5 py-3">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {viewData.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-10 text-gray-400">
                                            No members recorded as {view}.
                                        </td>
                                    </tr>
                                ) : viewData.map((m, i) => (
                                    <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                        <td className="px-5 py-3 text-gray-400 text-xs font-mono">{i + 1}</td>
                                        <td className="px-5 py-3 font-semibold text-primary">{m.name}</td>
                                        <td className="px-5 py-3 text-gray-600">{m.phone}</td>
                                        <td className="px-5 py-3 text-gray-600">{m.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-primary text-2xl font-bold">Attendance</h1>
                <p className="text-gray-500 text-base mt-1">Click on any Sunday to see who was present and absent.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {["Sunday", "Present", "Absent", "Attendance Rate", ""].map((h) => (
                                    <th key={h} className="text-left text-gray-500 font-semibold px-5 py-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(([date, { present, absent }]) => {
                                const total = present.length + absent.length;
                                const pct = total ? Math.round((present.length / total) * 100) : 0;
                                return (
                                    <tr
                                        key={date}
                                        className="border-b border-gray-50 hover:bg-blue-50/40 transition cursor-pointer"
                                        onClick={() => handleSelect({ date, present, absent })}
                                    >
                                        <td className="px-5 py-4 font-semibold text-primary">{date}</td>
                                        <td className="px-5 py-4">
                                            <span className="flex items-center gap-1.5 text-green-600 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                                                {present.length}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="flex items-center gap-1.5 text-red-400 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                                                {absent.length}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 max-w-[120px] bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${pct >= 75 ? "bg-green-500" : pct >= 50 ? "bg-orange-400" : "bg-red-400"}`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                                <span className={`text-sm font-bold ${pct >= 75 ? "text-green-600" : pct >= 50 ? "text-orange-500" : "text-red-500"}`}>
                                                    {pct}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-light font-semibold text-sm">View →</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAttendance;
