import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faCamera,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "../../components/admin/AddMemberModal";
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

const AdminMemberDetail = () => {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      setIsLoading(true);
      setFetchError("");
      try {
        const res = await adminServices.getMember(id);
        // API returns the member object directly at res.data
        if (res?.data) {
          setMember(res.data);
        } else {
          setFetchError("Member not found.");
        }
      } catch (err) {
        console.error("Error fetching member details:", err);
        setFetchError("Failed to load member details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const [uploadingPic, setUploadingPic] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setUploadingPic(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      await adminServices.updateMember(member._id, formData);
      // Refresh member to get new picture URL
      const res = await adminServices.getMember(id);
      if (res?.data) setMember(res.data);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadError("Failed to upload picture. Please try again.");
    } finally {
      setUploadingPic(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await adminServices.updateMember(member._id, updatedData);
      // Refresh from API after update
      const res = await adminServices.getMember(id);
      if (res?.data) setMember(res.data);
      setShowEdit(false);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  // ── Loading / error states ─────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <FontAwesomeIcon icon={faSpinner} className="text-primary text-3xl animate-spin" />
        <p className="text-gray-400 font-medium">Loading member details…</p>
      </div>
    );
  }

  if (fetchError || !member) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 text-xl font-semibold">
          {fetchError || "Member not found."}
        </p>
        <Link
          to="/admin/members"
          className="text-light font-semibold hover:underline mt-4 inline-block"
        >
          ← Back to Members
        </Link>
      </div>
    );
  }

  // ── Derived data ───────────────────────────────────────────────────────────

  const currentPic = preview || member.profilePicture;
  const rawAttendance = member.attendance || [];

  const years = [
    ...new Set(rawAttendance.map((a) => a.date?.split(",")[1]?.trim()).filter(Boolean)),
  ].sort((a, b) => b - a);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <MemberDetailView
      member={member}
      currentPic={currentPic}
      file={file}
      uploadingPic={uploadingPic}
      uploadError={uploadError}
      rawAttendance={rawAttendance}
      years={years}
      showEdit={showEdit}
      setShowEdit={setShowEdit}
      handleFileChange={handleFileChange}
      handleUpload={handleUpload}
      handleUpdate={handleUpdate}
    />
  );
};

// ── Inner view component (keeps hook rules clean) ──────────────────────────

const MemberDetailView = ({
  member, currentPic, file, uploadingPic, uploadError, rawAttendance, years,
  showEdit, setShowEdit, handleFileChange, handleUpload, handleUpdate,
}) => {
  const [year, setYear] = useState(years[0] || "All");

  const attendance =
    year === "All"
      ? rawAttendance
      : rawAttendance.filter((a) => a.date?.includes(year));

  const present  = attendance.filter((a) => a.status === "Present").length;
  const missed   = attendance.filter((a) => a.status === "Absent").length;
  const sick     = attendance.filter((a) => a.status === "Sick").length;
  const traveled = attendance.filter((a) => a.status === "Traveled").length;

  const pct = attendance.length
    ? Math.round((present / attendance.length) * 100)
    : 0;

  return (
    <div>
      {/* Header & Back */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/admin/members"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-semibold text-base transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Members
        </Link>
        <button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-light text-light font-semibold rounded-xl hover:bg-light hover:text-white transition text-sm"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit Member
        </button>
      </div>

      {/* Profile header */}
      <div className="bg-primary rounded-2xl p-6 text-white mb-6 flex sm:flex-row flex-col items-center gap-5">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase overflow-hidden border-2 border-white/20">
            {currentPic ? (
              <img src={currentPic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              member.firstName?.charAt(0) || "M"
            )}
          </div>
          <label className="absolute bottom-0 right-0 w-7 h-7 bg-white text-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faCamera} className="text-xs" />
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

          <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold">
            {member.prefix && <span className="opacity-70 mr-1">{member.prefix}.</span>}
            {member.firstName} {member.lastName}
          </h1>
          <div className="flex sm:flex-row flex-col items-center gap-3 mt-1 justify-center sm:justify-start">
            <p className="text-blue-300 capitalize">ID: {member.idCardNumber}</p>
            <span className="text-gray-500">|</span>
            <p className="text-blue-300">{member.phone}</p>
            <span className="text-gray-500">|</span>
            {/* Role pill: admin if permissions exist */}
            {(member.permissions?.length > 0) ? (
              <span className="bg-purple-400/30 text-purple-100 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Admin
              </span>
            ) : (
              <span className="bg-blue-400/20 text-blue-100 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Member
              </span>
            )}
            {/* Active / Inactive status */}
            <span className={`text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider ${
              member.isActive !== false
                ? "bg-green-400/20 text-green-200"
                : "bg-red-400/20 text-red-200"
            }`}>
              {member.isActive !== false ? "Active" : "Inactive"}
            </span>
            {file && (
              <button
                onClick={handleUpload}
                disabled={uploadingPic}
                className="bg-white text-primary px-3 py-1 text-xs rounded-full font-bold shadow-sm hover:bg-gray-50 transition ml-0 sm:ml-4 disabled:opacity-60"
              >
                {uploadingPic ? "Uploading…" : "Upload Photo"}
              </button>
            )}
          </div>
          {uploadError && (
            <p className="text-red-300 text-xs mt-2 font-medium">{uploadError}</p>
          )}
        </div>
      </div>

      {/* Info grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-primary font-bold text-lg mb-5">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoRow label="Full Name" value={`${member.firstName} ${member.lastName}`} />
          <InfoRow label="Phone Number" value={member.phone} />
          <InfoRow label="Email" value={member.email} />
          <InfoRow label="Address" value={member.address} />
          <InfoRow label="Date of Baptism" value={fmt(member.dateBaptised)} />
          <InfoRow label="Date Joined" value={fmt(member.dateJoined)} />
          <InfoRow label="Gender" value={<span className="capitalize">{member.gender}</span>} />
          <InfoRow label="Home Congregation" value={member.homeCongregation} />
          <InfoRow label="Marital Status" value={<span className="capitalize">{member.maritalStatus}</span>} />
          <InfoRow label="Occupation" value={member.occupation} />
          <InfoRow label="ID Card Number" value={member.idCardNumber} />
          <InfoRow label="Ministries" value={member.ministries?.join(", ")} />
        </div>
      </div>

      {/* Next of Kin */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-primary font-bold text-lg mb-5">Next of Kin Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoRow label="Name" value={member.nextOfKin?.name} />
          <InfoRow label="Phone" value={member.nextOfKin?.phone} />
          <InfoRow label="Address" value={member.nextOfKin?.address} />
        </div>
      </div>

      {/* Attendance */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-primary font-bold text-lg">Attendance History</h2>
            <p className="text-gray-500 text-sm mt-0.5">
              {present} present · {missed} absent ·{" "}
              <span className={`font-bold ${pct >= 75 ? "text-green-500" : "text-orange-400"}`}>
                {pct}% attendance
              </span>
            </p>
          </div>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 text-sm font-semibold outline-none focus:border-light transition"
          >
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
          <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-bold">
            <FontAwesomeIcon icon={faCheckCircle} /> {sick} Sick
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">
            <FontAwesomeIcon icon={faCheckCircle} /> {traveled} Traveled
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left text-gray-500 font-semibold px-5 py-3">Date</th>
                <th className="text-left text-gray-500 font-semibold px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3 text-gray-700 font-medium">{a.date}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${a.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : a.status === "Sick"
                          ? "bg-orange-100 text-orange-600"
                          : a.status === "Traveled"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-400"
                        }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-10 text-gray-400">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEdit && (
        <AddMemberModal
          onClose={() => setShowEdit(false)}
          onAdd={handleUpdate}
          initialData={{
            ...member,
            roles: member.roles || ["MEMBER"],
            _id: member._id,
          }}
        />
      )}
    </div>
  );
};

export default AdminMemberDetail;
