import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import AddMemberModal from "../admin/AddMemberModal";
import { adminServices } from "../../services/adminServices";

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
      {label}
    </p>
    <p className="text-primary font-semibold text-base">{value || "—"}</p>
  </div>
);

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

const MembersProfile = ({ onBack }) => {
    const { user, member } = useAuth();
    
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [localMember, setLocalMember] = useState(member);

    const profile = localMember || {};
    const userRole = user?.roles?.join(', ') || user?.role || profile?.role || "MEMBER";

    const currentPic = preview || profile?.profilePicture;

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = () => {
        console.log("File ready for API upload ->", file);
        setFile(null);
    };

    const handleUpdate = async (updatedData) => {
      try {
        // As requested: the user can update their profile using the same endpoint as the admin
        await adminServices.updateMember(user._id || user.id, updatedData);
        console.log("Successfully updated via API.");
        setLocalMember({ ...localMember, ...updatedData });
        setShowEdit(false);
      } catch (err) {
        console.error("Failed to update:", err);
      }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="bg-primary px-6 py-4 flex items-center justify-between shadow-md relative z-50">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-semibold transition"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back to Dashboard
                </button>
                <div className="text-white font-bold text-base">My Profile</div>
            </div>

            <div className="max-w-5xl mx-auto w-full px-4 py-8 md:py-10 flex-1">
                <div className="flex items-center justify-end mb-6">
                    <button
                      onClick={() => setShowEdit(true)}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-light text-light font-semibold rounded-xl hover:bg-light hover:text-white transition text-sm bg-white shadow-sm"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit Profile
                    </button>
                </div>

                {/* Profile header */}
                <div className="bg-primary rounded-2xl p-6 text-white mb-6 flex sm:flex-row flex-col items-center gap-5 shadow-sm">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase overflow-hidden border-2 border-white/20">
                      {currentPic ? (
                        <img src={currentPic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile.firstName?.charAt(0) || "M"
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-7 h-7 bg-white text-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-100 transition">
                      <FontAwesomeIcon icon={faCamera} className="text-xs" />
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-2xl font-bold">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    <div className="flex sm:flex-row flex-col items-center gap-3 mt-1 justify-center sm:justify-start">
                      <p className="text-blue-300 text-sm capitalize">
                        {profile.homeCongregation} Congregation
                      </p>
                      <span className="bg-blue-400/20 text-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {userRole}
                      </span>
                      {file && (
                        <button onClick={handleUpload} className="bg-white text-primary px-3 py-1 text-xs rounded-full font-bold shadow-sm hover:bg-gray-50 transition ml-0 sm:ml-4">
                          Upload New Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-primary font-bold text-lg mb-5">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoRow
                      label="Full Name"
                      value={`${profile.firstName} ${profile.lastName}`}
                    />
                    <InfoRow label="Phone Number" value={profile.phone} />
                    <InfoRow label="Email" value={profile.email} />
                    <InfoRow label="Address" value={profile.address} />
                    <InfoRow label="Date of Baptism" value={fmt(profile.dateBaptised)} />
                    <InfoRow label="Date Joined" value={fmt(profile.dateJoined)} />
                    <InfoRow
                      label="Gender"
                      value={<span className="capitalize">{profile.gender}</span>}
                    />
                    <InfoRow label="Home Congregation" value={profile.homeCongregation} />
                    <InfoRow
                      label="Marital Status"
                      value={<span className="capitalize">{profile.maritalStatus}</span>}
                    />
                    <InfoRow label="Occupation" value={profile.occupation} />
                    <InfoRow label="ID Card Number" value={profile.idCardNumber} />
                    <InfoRow label="Ministries" value={profile.ministries?.join(", ")} />
                  </div>
                </div>

                {/* Next of Kin */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-primary font-bold text-lg mb-5">
                    Next of Kin Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InfoRow label="Name" value={profile.nextOfKin?.name} />
                    <InfoRow label="Phone" value={profile.nextOfKin?.phone} />
                    <InfoRow label="Address" value={profile.nextOfKin?.address} />
                  </div>
                </div>
            </div>

            {showEdit && (
              <AddMemberModal
                onClose={() => setShowEdit(false)}
                onAdd={handleUpdate}
                initialData={{
                  ...profile,
                  roles: user?.roles || ["MEMBER"],
                  _id: user?._id || user?.id,
                }}
              />
            )}
        </div>
    );
};

export default MembersProfile;
