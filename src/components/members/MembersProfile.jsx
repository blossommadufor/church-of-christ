import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera, faUser, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";

const MembersProfile = ({ member, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(member?.profilePicture || null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
        // In reality, we'd update `member` or alert success
        alert("Profile picture uploaded successfully! (Simulated)");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-primary px-6 py-4 flex items-center justify-between shadow-md">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-semibold transition"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back to Dashboard
                </button>
                <div className="text-white font-bold text-base">My Profile</div>
            </div>

            {/* Content */}
            <div className="max-w-xl mx-auto w-full px-4 py-10 flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center">

                    {/* Picture Upload Area */}
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center text-4xl text-gray-300">
                            {preview ? (
                                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <FontAwesomeIcon icon={faUser} />
                            )}
                        </div>
                        <label className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-light transition">
                            <FontAwesomeIcon icon={faCamera} />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <h1 className="text-primary text-2xl font-bold mb-1">{member?.name || "Member Name"}</h1>
                    <p className="text-gray-500 text-base mb-6">ID: {member?.userId || "N/A"}</p>

                    {file && (
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            className="bg-primary text-white font-semibold py-2 px-6 rounded-xl hover:bg-light transition flex items-center gap-2 mb-8"
                        >
                            {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
                            {loading ? "Uploading..." : "Save Picture"}
                        </button>
                    )}

                    <div className="w-full h-px bg-gray-100 mb-8" />

                    {/* Member Details */}
                    <div className="w-full flex justify-between items-center py-3 border-b border-gray-50">
                        <span className="text-gray-500 font-medium">Full Name</span>
                        <span className="text-gray-800 font-semibold">{member?.name || "N/A"}</span>
                    </div>
                    <div className="w-full flex justify-between items-center py-3 border-b border-gray-50">
                        <span className="text-gray-500 font-medium">Phone Number</span>
                        <span className="text-gray-800 font-semibold">{member?.phone || "N/A"}</span>
                    </div>
                    {/* Expandable down the line as `member` object gets fully hydrated from the backend payload */}

                </div>
            </div>
        </div>
    );
};

export default MembersProfile;
