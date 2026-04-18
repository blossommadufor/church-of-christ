import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
  faUsers,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { adminServices } from "../../services/adminServices";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../utils/permissions";
import DateInput from "../../components/DateInput";
import MemberSearchSelect from "../../components/admin/MemberSearchSelect";
import { exportToExcel } from "../../utils/exportUtils";
import { formatDate } from "../../utils/dateUtils";

// ─── Constants ────────────────────────────────────────────────────────────────

const now = new Date();

const MONTHS = [
  { label: "All Months", value: "" },
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const SERVICE_DAYS = [
  { label: "All Services", value: "" },
  { label: "Sunday", value: "Sunday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Friday", value: "Friday" },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    Present: "bg-green-100 text-green-700",
    Absent: "bg-red-100 text-red-500",
    Sick: "bg-orange-100 text-orange-600",
    Traveled: "bg-blue-100 text-blue-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${map[status] ?? "bg-gray-100 text-gray-500"
        }`}
    >
      {status}
    </span>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminAttendance = () => {
  // ── Filter state ──────────────────────────────────────────────────────────
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year] = useState(now.getFullYear());
  const [serviceDay, setServiceDay] = useState("Sunday");
  const [page, setPage] = useState(1);

  // ── Data state ────────────────────────────────────────────────────────────
  const [attendance, setAttendance] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ── Detail view state ─────────────────────────────────────────────────────
  const [selected, setSelected] = useState(null);
  const [detailView, setDetailView] = useState("present");
  const [detailSearch, setDetailSearch] = useState("");

  // ── Modals / Forms ────────────────────────────────────────────────────────
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [markForm, setMarkForm] = useState({ memberId: null, status: "Present" });
  const [submittingMark, setSubmittingMark] = useState(false);

  const [showAbsentModal, setShowAbsentModal] = useState(false);
  const [absentDate, setAbsentDate] = useState("");
  const [absentMembersList, setAbsentMembersList] = useState([]);
  const [fetchingAbsentees, setFetchingAbsentees] = useState(false);

  const { user, members } = useAuth();
  const canView = hasPermission(user, "ATTENDANCE_VIEW") || hasPermission(user, "ATTENDANCE_MARK");
  const canMark = hasPermission(user, "ATTENDANCE_MARK") || hasPermission(user, "DO_ALL");

  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const params = { year, page };
        if (month) params.month = month;
        if (serviceDay) params.serviceDay = serviceDay;

        const res = await adminServices.getAttendanceList(params);

        // Adapt to whatever shape the API returns
        const data = res?.data ?? res;
        if (Array.isArray(data)) {
          setAttendance(data);
          setTotalPages(1);
          setTotalRecords(data.length);
        } else if (data?.records || data?.attendance) {
          const list = data.records ?? data.attendance ?? [];
          setAttendance(list);
          setTotalPages(data.pages ?? data.totalPages ?? 1);
          setTotalRecords(data.total ?? data.totalRecords ?? list.length);
        } else {
          setAttendance([]);
        }
      } catch (err) {
        console.error("[Attendance API Error]:", err);
        setAttendance([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (canView) {
      fetchAttendance();
    }
  }, [month, year, serviceDay, page, canView]);

  const handleMonthChange = (v) => {
    setMonth(v);
    setPage(1);
    setSelected(null);
  };

  const handleServiceDayChange = (v) => {
    setServiceDay(v);
    setPage(1);
    setSelected(null);
  };

  // ── Detail view (grouped by date) ─────────────────────────────────────────

  const handleMarkSubmit = async () => {
    if (!markForm.memberId) return;
    setSubmittingMark(true);
    try {
      await adminServices.markAttendance({
        memberId: markForm.memberId,
        status: markForm.status
      });
      alert("Attendance marked successfully");
      setShowMarkModal(false);
      setMarkForm({ memberId: null, status: "Present" });
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance.");
    } finally {
      setSubmittingMark(false);
    }
  };

  const handleFetchAbsentees = async () => {
    if (!absentDate) return;
    setFetchingAbsentees(true);
    try {
      const res = await adminServices.getAbsentMembers(absentDate);
      setAbsentMembersList(res?.data?.absentees || []);
    } catch (err) {
      console.error(err);
      setAbsentMembersList([]);
      alert("Failed to fetch absentees.");
    } finally {
      setFetchingAbsentees(false);
    }
  };

  const handleExport = () => {
    const exportData = attendance.map((record, idx) => {
      const date = record.date ?? record.serviceDate ?? record._id ?? `Record ${idx + 1}`;
      const present = record.presentCount ?? record.present ?? 0;
      const absent = record.absentCount ?? record.absent ?? 0;
      const sick = record.sickCount ?? record.sick ?? 0;
      const traveled = record.traveledCount ?? record.traveled ?? 0;
      const total = present + absent + sick + traveled;
      const pct = total ? Math.round((present / total) * 100) : 0;
      return {
        "Date / Service": String(date),
        "Present": present,
        "Absent": absent,
        "Sick": sick,
        "Traveled": traveled,
        "Attendance Rate (%)": pct
      };
    });
    exportToExcel(exportData, `Attendance_Export_${new Date().getTime()}.xlsx`);
  };

  if (!canView) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500 mt-2">You do not have permission to view attendance records.</p>
      </div>
    );
  }

  if (selected) {
    const m = selected.members ?? {};
    const groups = {
      present: Array.isArray(m.present) ? m.present : [],
      absent: Array.isArray(m.absent) ? m.absent : [],
      sick: Array.isArray(m.sick) ? m.sick : [],
      // API may spell it "travelled" (double-l)
      traveled: Array.isArray(m.traveled) ? m.traveled
        : Array.isArray(m.travelled) ? m.travelled : [],
    };
    const rawView = groups[detailView] ?? [];
    const viewData = detailSearch.trim()
      ? rawView.filter((m) => {
          const full = `${m.firstName ?? ""} ${m.lastName ?? ""}`.toLowerCase();
          return full.includes(detailSearch.toLowerCase());
        })
      : rawView;

    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-semibold text-base mb-6 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Attendance
        </button>

        <div className="mb-6">
          <h1 className="text-primary text-2xl font-bold">
            {formatDate(selected.date)}
          </h1>
          {/* <p className="text-gray-500 text-base mt-1">
            {groups.present.length} present · {groups.absent.length} absent ·{" "}
            {groups.sick.length} sick · {groups.traveled.length} traveled
          </p> */}
        </div>

        {/* Detail search */}
        <div className="relative max-w-sm mb-6">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search members…"
            value={detailSearch}
            onChange={(e) => setDetailSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition"
          />
        </div>

        {/* Toggle pills */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {[
            { key: "present", color: "green" },
            { key: "sick", color: "orange" },
            { key: "traveled", color: "blue" },
            { key: "absent", color: "red" },
          ].map(({ key, color }) => (
            <button
              key={key}
              onClick={() => setDetailView(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold capitalize transition ${detailView === key
                ? `bg-${color}-500 text-white shadow-md`
                : `bg-${color}-50 text-${color}-600 hover:bg-${color}-100`
                }`}
            >
              <FontAwesomeIcon icon={faUsers} /> {key} ({groups[key].length})
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-primary font-bold text-lg capitalize">
              Members {detailView}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["No.", "Name", "ID", "Phone", "Email"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-gray-500 font-semibold px-5 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {viewData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-10 text-gray-400"
                    >
                      No members recorded as {detailView}.
                    </td>
                  </tr>
                ) : (
                  viewData.map((m, i) => (
                    <tr
                      key={m._id ?? i}
                      className="border-b border-gray-50 hover:bg-gray-50 transition h-16"
                    >
                      <td className="px-5 py-3">
                        {i + 1}
                      </td>
                      <td className="px-5 py-3 font-semibold text-primary">
                        {m.name ?? `${m.firstName ?? ""} ${m.lastName ?? ""}`}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{m.idCardNumber || "N/A"}</td>
                      <td className="px-5 py-3 text-gray-600">{m.phone || "N/A"}</td>
                      <td className="px-5 py-3 text-gray-600">{m.email || "N/A"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ── List view ──────────────────────────────────────────────────────────────

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-primary text-2xl font-bold">Attendance</h1>
          <p className="text-gray-500 text-base mt-1">
            Browse and search attendance records.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAbsentModal(true)}
            className="px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:border-gray-300 transition"
          >
            View Absent Members
          </button>
          {canMark && (
            <button
              onClick={() => setShowMarkModal(true)}
              className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl shadow-sm hover:bg-light transition"
            >
              Mark Attendance
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Month */}
            <select
              value={month}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition cursor-pointer"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            {/* Service day */}
            <select
              value={serviceDay}
              onChange={(e) => handleServiceDayChange(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition cursor-pointer"
            >
              {SERVICE_DAYS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export — right side */}
          <button
            onClick={handleExport}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:border-gray-300 transition whitespace-nowrap"
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Date / Service", "Present", "Absent", "Sick", "Traveled", "Rate", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-gray-500 font-semibold px-5 py-4"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-gray-400 text-base"
                  >
                    Loading attendance…
                  </td>
                </tr>
              ) : attendance.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-gray-400 text-base"
                  >
                    No attendance records found for the selected period.
                  </td>
                </tr>
              ) : (
                attendance.map((record, idx) => {
                  // Flexible key mapping — API shape TBD
                  const date = record.date ?? record.serviceDate ?? record._id ?? `Record ${idx + 1}`;
                  const present = record.presentCount ?? record.counts?.present ?? 0;
                  const absent = record.absentCount ?? record.counts?.absent ?? 0;
                  const sick = record.sickCount ?? record.counts?.sick ?? 0;
                  const traveled = record.traveledCount ?? record.counts?.traveled ?? 0;
                  const total = present + absent + sick + traveled;
                  const pct = total ? Math.round((present / total) * 100) : 0;

                  return (
                    <tr
                      key={record._id ?? idx}
                      className="border-b border-gray-50 hover:bg-blue-50/30 transition cursor-pointer h-16"
                      onClick={() => setSelected(record)}
                    >
                      <td className="px-5 py-4 font-semibold text-primary whitespace-nowrap">
                        {formatDate(date)}
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-green-600 font-bold">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                          {present}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-red-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                          {absent}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-orange-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                          {sick}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-1.5 text-blue-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                          {traveled}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[100px] bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${pct >= 75
                                ? "bg-green-500"
                                : pct >= 50
                                  ? "bg-orange-400"
                                  : "bg-red-400"
                                }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span
                            className={`text-sm font-bold ${pct >= 75
                              ? "text-green-600"
                              : pct >= 50
                                ? "text-orange-500"
                                : "text-red-500"
                              }`}
                          >
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-light font-semibold text-sm">
                        View →
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 flex items-center justify-between border-t border-gray-100">
            <p className="text-gray-500 text-sm">
              Page {page} of {totalPages}
              {totalRecords > 0 && ` · ${totalRecords} records`}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-light hover:text-light disabled:opacity-40 transition"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-light hover:text-light disabled:opacity-40 transition"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MARK ATTENDANCE MODAL */}
      {showMarkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-primary font-bold text-lg">Mark Member Attendance</h2>
              <button onClick={() => setShowMarkModal(false)} className="text-gray-400 hover:text-gray-600 transition text-xl font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Select Member</label>
                <MemberSearchSelect
                  onChange={(opt) => setMarkForm(p => ({ ...p, memberId: opt?.value }))}
                  placeholder="Search a member by name..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Status</label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-light/30 transition text-sm text-gray-700"
                  value={markForm.status}
                  onChange={(e) => setMarkForm(p => ({ ...p, status: e.target.value }))}
                >
                  <option value="Present">Present</option>
                  <option value="Sick">Sick</option>
                  <option value="Traveled">Traveled</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-5 bg-gray-50 flex gap-3 border-t border-gray-100">
              <button
                onClick={() => setShowMarkModal(false)}
                className="flex-1 py-2.5 font-bold text-gray-600 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition"
              >
                Cancel
              </button>
              <button
                disabled={!markForm.memberId || submittingMark}
                onClick={handleMarkSubmit}
                className="flex-1 py-2.5 font-bold text-white bg-primary rounded-xl hover:bg-light transition disabled:opacity-50"
              >
                {submittingMark ? "Submitting..." : "Mark Status"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABSENT MEMBERS MODAL */}
      {showAbsentModal && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white flex-shrink-0">
              <h2 className="text-primary font-bold text-lg">Absent Members Lookup</h2>
              <button onClick={() => setShowAbsentModal(false)} className="text-gray-400 hover:text-gray-600 transition text-lg px-2">&times;</button>
            </div>
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-end gap-4 flex-shrink-0">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Select Service Date</label>
                <DateInput
                  type="date"
                  value={absentDate}
                  onChange={(e) => {
                    const d = new Date(e.target.value);
                    // Allow Sundays only
                    if (d.getDay() !== 0) {
                      alert("Please select a Sunday.");
                      return;
                    }
                    setAbsentDate(e.target.value);
                  }}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-light"
                />
              </div>
              <button
                disabled={fetchingAbsentees || !absentDate}
                onClick={handleFetchAbsentees}
                className="bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-light transition disabled:opacity-50"
              >
                {fetchingAbsentees ? "Loading..." : "Fetch Records"}
              </button>
            </div>
            <div className="p-6 overflow-y-auto min-h-[200px] flex-1">
              {absentMembersList.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm font-medium">Select a service date to view absentees.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200 text-left text-gray-500 rounded-xl overflow-hidden">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Card ID</th>
                      <th className="px-4 py-3">Member Name</th>
                      <th className="px-4 py-3">Gender</th>
                      <th className="px-4 py-3">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absentMembersList.map((m, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-400 text-xs font-mono">{i + 1}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono">{m.idCardNumber || '—'}</td>
                        <td className="px-4 py-3 font-semibold text-primary capitalize">{m.firstName || m.name || ''} {m.lastName || ''}</td>
                        <td className="px-4 py-3 text-gray-500 capitalize">{m.gender || '—'}</td>
                        <td className="px-4 py-3 text-gray-500">{m.phone || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;
