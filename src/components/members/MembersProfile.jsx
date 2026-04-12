import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera, faUser, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const MembersProfile = ({ onBack }) => {
    const { user, member } = useAuth();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(member?.profilePicture || null);

    const displayName = user?.name || `${member?.firstName || ''} ${member?.lastName || ''}`.trim() || 'Member Name';
    const displayEmail = user?.email || member?.email || 'N/A';
    const displayPhone = user?.phone || member?.phone || 'N/A';
    const displayRole = user?.roles?.join(', ') || user?.role || member?.role || 'MEMBER';
    const displayId = user?.idCardNumber || member?.idCardNumber || 'N/A';

    const displayGender = member?.gender || 'N/A';
    const displayAddress = member?.address || 'N/A';
    const displayDob = member?.dateOfBirth ? new Date(member.dateOfBirth).toLocaleDateString() : 'N/A';
    const displayBaptism = member?.dateOfBaptism ? new Date(member.dateOfBaptism).toLocaleDateString() : 'N/A';
    const displayMarital = member?.maritalStatus || 'N/A';
    const displayState = member?.stateOfOrigin || 'N/A';
    const displayLga = member?.lgaOfOrigin || 'N/A';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
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

            <div className="max-w-5xl mx-auto w-full px-4 py-10 flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Sidebar (Avatar and basic Identity) */}
                    <div className="flex flex-col items-center lg:w-1/3">
                        <div className="relative mb-6">
                            <div className="w-40 h-40 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center text-5xl text-gray-300">
                                {preview ? (
                                    <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <FontAwesomeIcon icon={faUser} />
                                )}
                            </div>
                            <label className="absolute bottom-2 right-2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-light transition">
                                <FontAwesomeIcon icon={faCamera} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        <h1 className="text-primary text-2xl font-bold mb-1 text-center">{displayName}</h1>
                        <p className="text-gray-500 text-base mb-2">ID: {displayId}</p>
                        <p className="text-gray-500 text-sm font-bold uppercase mb-6 bg-gray-100 px-3 py-1 rounded-full">{displayRole}</p>

                        {file && (
                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="bg-primary text-white font-semibold py-2 px-6 rounded-xl hover:bg-light transition flex items-center gap-2 w-full justify-center"
                            >
                                {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
                                {loading ? "Uploading..." : "Save Picture"}
                            </button>
                        )}
                    </div>

                    {/* Right Details Grid */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Personal Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Contact Info */}
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-gray-800 font-medium">{displayEmail}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Phone Number</p>
                                <p className="text-gray-800 font-medium">{displayPhone}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Home Address</p>
                                <p className="text-gray-800 font-medium">{displayAddress}</p>
                            </div>

                            {/* Demographics */}
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Gender</p>
                                <p className="text-gray-800 font-medium capitalize">{displayGender}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Marital Status</p>
                                <p className="text-gray-800 font-medium capitalize">{displayMarital}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Date of Birth</p>
                                <p className="text-gray-800 font-medium">{displayDob}</p>
                            </div>
                            
                            {/* Origin */}
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">State of Origin</p>
                                <p className="text-gray-800 font-medium capitalize">{displayState}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">LGA</p>
                                <p className="text-gray-800 font-medium capitalize">{displayLga}</p>
                            </div>

                            {/* Church Data */}
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Date of Baptism</p>
                                <p className="text-gray-800 font-medium">{displayBaptism}</p>
                            </div>
                            {member?.homeCongregation && (
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Home Congregation</p>
                                    <p className="text-gray-800 font-medium capitalize">{member.homeCongregation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersProfile;
