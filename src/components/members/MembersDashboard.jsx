import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
    faLocationDot,
    faSpinner,
    faSignOut,
    faCalendarCheck,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../public/assets/logo3.png";
import MembersProfile from "./MembersProfile";

const isAlreadyMarkedToday = (lastAttendance) => {
    if (!lastAttendance) return false;
    const today = new Date().toDateString();
    return new Date(lastAttendance).toDateString() === today;
};

// idle | select_status | checking | confirm | submitting | success | already | denied | failed
const MembersDashboard = ({ member, onSignOut }) => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [attended, setAttended] = useState(member.attended);
    const [missed] = useState(member.missed);

    // Day logic
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 4 = Thursday
    const isServiceDay = dayOfWeek === 0 || dayOfWeek === 4;
    const serviceName = dayOfWeek === 0 ? "General Worship" : dayOfWeek === 4 ? "Bible Study" : "Service";

    const [attStep, setAttStep] = useState(() => {
        if (!isServiceDay) return "not_service_day";
        return isAlreadyMarkedToday(member.lastAttendance) ? "already" : "idle";
    });

    const [coords, setCoords] = useState(null);
    const [submitError, setSubmitError] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        if (status === "Present") {
            startAttendance();
        } else {
            // Sick or Traveled skip location
            confirmAttendance(status);
        }
    };

    const startAttendance = () => {
        setAttStep("checking");
        setSubmitError("");

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCoords({
                    lat: pos.coords.latitude.toFixed(5),
                    lng: pos.coords.longitude.toFixed(5),
                });
                setAttStep("confirm");
            },
            (err) => {
                if (err.code === 1) {
                    // PERMISSION_DENIED
                    setAttStep("denied");
                } else if (err.code === 2) {
                    // POSITION_UNAVAILABLE — common on desktop PCs with no GPS
                    setAttStep("unavailable");
                } else {
                    // TIMEOUT or unknown
                    setAttStep("failed");
                }
            },
            { timeout: 12000, maximumAge: 30000, enableHighAccuracy: false }
        );
    };

    const confirmAttendance = async (statusOverride = null) => {
        setAttStep("submitting");
        const finalStatus = statusOverride || selectedStatus || "Present";

        // TODO: replace with real API — send userId, coords, timestamp, finalStatus
        await new Promise((r) => setTimeout(r, 1500));

        if (finalStatus === "Present") {
            setAttended((a) => a + 1);
        }
        setAttStep("success");
    };

    const reset = () => {
        setAttStep("select_status");
        setCoords(null);
        setSubmitError("");
    };

    const totalSundays = attended + missed;

    if (activeTab === "profile") {
        return <MembersProfile member={member} onBack={() => setActiveTab("dashboard")} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-primary px-6 py-4 flex items-center justify-between shadow-md">
                <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                    <img src={logo} alt="logo" className="w-10" />
                    <div>
                        <p className="text-white font-bold text-base leading-none">Members Portal</p>
                        <p className="text-blue-300 text-xs">Church of Christ, Nyanya</p>
                    </div>
                </a>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-semibold transition"
                    >
                        <FontAwesomeIcon icon={faUser} />
                        Profile
                    </button>
                    <button
                        onClick={onSignOut}
                        className="flex items-center gap-2 text-red-300 hover:text-red-400 text-sm font-semibold transition"
                    >
                        <FontAwesomeIcon icon={faSignOut} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-lg mx-auto px-4 py-10">
                {/* Welcome */}
                <div className="mb-8">
                    <p className="text-gray-500 text-base">Welcome back,</p>
                    <h1 className="text-primary text-2xl font-bold">{member.name}</h1>
                    <p className="text-gray-400 text-xs mt-1">Member ID: {member.userId}</p>
                </div>

                {/* ── Attendance summary cards ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-1">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl" />
                        </div>
                        <p className="text-gray-500 text-sm font-semibold">Sundays Attended</p>
                        <p className="text-primary text-4xl font-bold">{attended}</p>
                        {totalSundays > 0 && (
                            <p className="text-green-500 text-xs font-semibold">
                                {Math.round((attended / totalSundays) * 100)}% attendance
                            </p>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-1">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-red-400 text-xl" />
                        </div>
                        <p className="text-gray-500 text-sm font-semibold">Sundays Missed</p>
                        <p className="text-primary text-4xl font-bold">{missed}</p>
                        {totalSundays > 0 && (
                            <p className="text-red-400 text-xs font-semibold">
                                {Math.round((missed / totalSundays) * 100)}% absent
                            </p>
                        )}
                    </div>
                </div>

                {/* ── Mark Attendance ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCalendarCheck} className="text-primary text-lg" />
                        </div>
                        <div>
                            <h2 className="text-primary font-bold text-base">{serviceName} Attendance</h2>
                            <p className="text-gray-400 text-xs">
                                {today.toLocaleDateString("en-NG", {
                                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* ── States ── */}
                    {attStep === "not_service_day" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <p className="text-gray-500 font-semibold">No services scheduled today.</p>
                            <p className="text-gray-400 text-sm">Attendance marking is only available on Thursdays (Bible Study) and Sundays (General Worship).</p>
                        </div>
                    )}

                    {attStep === "idle" && (
                        <button
                            onClick={() => setAttStep("select_status")}
                            className="w-full bg-primary text-white font-semibold py-3.5 rounded-xl hover:bg-light transition-colors duration-200 flex items-center justify-center gap-2 text-base"
                        >
                            <FontAwesomeIcon icon={faCalendarCheck} />
                            Mark Attendance
                        </button>
                    )}

                    {attStep === "select_status" && (
                        <div className="flex flex-col gap-4 py-2">
                            <p className="text-gray-600 font-semibold text-center text-sm mb-2">What is your current status?</p>
                            <button
                                onClick={() => handleSelectStatus("Present")}
                                className="w-full bg-green-500 text-white font-semibold py-3.5 rounded-xl hover:bg-green-600 transition-colors text-base flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={faLocationDot} /> I am Present
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleSelectStatus("Sick")}
                                    className="w-full bg-orange-100 text-orange-600 font-semibold py-3 rounded-xl hover:bg-orange-200 transition-colors text-sm"
                                >
                                    Sick
                                </button>
                                <button
                                    onClick={() => handleSelectStatus("Traveled")}
                                    className="w-full bg-blue-100 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-200 transition-colors text-sm"
                                >
                                    Traveled
                                </button>
                            </div>
                        </div>
                    )}

                    {attStep === "checking" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-light text-3xl animate-spin" />
                            <p className="text-gray-600 font-semibold">Checking your location…</p>
                            <p className="text-gray-400 text-sm">Please allow location access if prompted.</p>
                        </div>
                    )}

                    {attStep === "confirm" && coords && (
                        <div className="flex flex-col gap-4">
                            <div className="bg-blue-50 rounded-xl p-4 text-center">
                                <FontAwesomeIcon icon={faLocationDot} className="text-light text-xl mb-2" />
                                <p className="text-gray-600 text-sm font-semibold mb-1">Location detected</p>
                                <p className="text-gray-400 text-xs">
                                    {coords.lat}, {coords.lng}
                                </p>
                            </div>
                            <p className="text-gray-600 font-semibold text-center text-base">
                                Are you currently at the church venue?
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => reset()}
                                    className="py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-red-300 hover:text-red-500 transition text-base"
                                >
                                    ❌ No, Cancel
                                </button>
                                <button
                                    onClick={() => confirmAttendance()}
                                    className="py-3 rounded-xl bg-primary text-white font-semibold hover:bg-light transition text-base"
                                >
                                    ✅ Yes, Confirm
                                </button>
                            </div>
                        </div>
                    )}

                    {attStep === "submitting" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faSpinner} className="text-light text-3xl animate-spin" />
                            <p className="text-gray-600 font-semibold">Submitting attendance…</p>
                        </div>
                    )}

                    {attStep === "success" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl" />
                            <p className="text-green-600 font-bold text-lg">Attendance Marked!</p>
                            <p className="text-gray-400 text-sm">
                                {selectedStatus === "Present"
                                    ? "Your attendance has been recorded for today."
                                    : `Your status has been recorded as ${selectedStatus}.`}
                            </p>
                        </div>
                    )}

                    {attStep === "already" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 text-3xl" />
                            <p className="text-green-600 font-bold">Already marked today</p>
                            <p className="text-gray-400 text-sm">You've already recorded attendance for this Sunday.</p>
                        </div>
                    )}

                    {attStep === "denied" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faLocationDot} className="text-red-400 text-3xl" />
                            <p className="text-red-500 font-bold">Location access denied</p>
                            <p className="text-gray-400 text-sm">
                                Location access is required to mark attendance. Please enable it in your browser settings and try again.
                            </p>
                            <button onClick={() => setAttStep("idle")} className="text-light font-semibold hover:underline text-sm">
                                Try again
                            </button>
                        </div>
                    )}

                    {attStep === "unavailable" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faLocationDot} className="text-orange-400 text-3xl" />
                            <p className="text-orange-500 font-bold">Location unavailable</p>
                            <p className="text-gray-400 text-sm">
                                Your device could not determine your location. This usually happens on desktop computers without GPS hardware.
                                Please use your phone to mark attendance.
                            </p>
                            <button onClick={() => setAttStep("select_status")} className="text-light font-semibold hover:underline text-sm">
                                Try again
                            </button>
                        </div>
                    )}

                    {attStep === "failed" && (
                        <div className="flex flex-col items-center gap-3 py-4 text-center">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-red-400 text-3xl" />
                            <p className="text-red-500 font-bold">Location fetch failed</p>
                            <p className="text-gray-400 text-sm">
                                We couldn't retrieve your location. Please check your connection and try again.
                            </p>
                            <button
                                onClick={() => setAttStep("select_status")}
                                className="mt-1 py-2 px-6 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-light transition"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {submitError && (
                        <p className="text-red-500 text-sm text-center mt-3">{submitError}</p>
                    )}
                </div>
            </div>
        </div >
    );
};

export default MembersDashboard;
