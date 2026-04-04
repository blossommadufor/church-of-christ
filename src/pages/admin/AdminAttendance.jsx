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
import { buildQueryParams } from "../../utils/analyticsUtils";

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
      className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
        map[status] ?? "bg-gray-100 text-gray-500"
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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ── Data state ────────────────────────────────────────────────────────────
  const [attendance, setAttendance] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ── Detail view state ─────────────────────────────────────────────────────
  const [selected, setSelected] = useState(null);
  const [detailView, setDetailView] = useState("present");

  // ── Fetch ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const params = { year, page };
        if (month) params.month = month;
        if (serviceDay) params.serviceDay = serviceDay;
        if (search.trim()) params.search = search.trim();

        const res = await adminServices.getAttendanceList(params);
        console.log("[Attendance API Response]:", res);

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
    fetchAttendance();
  }, [month, year, serviceDay, search, page]);

  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
  };

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

  if (selected) {
    const groups = { present: [], absent: [], sick: [], traveled: [] };
    (selected.members ?? []).forEach((m) => {
      const key = m.status?.toLowerCase();
      if (groups[key]) groups[key].push(m);
    });
    const viewData = groups[detailView] ?? [];

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
            {selected.date ?? selected.serviceDate}
          </h1>
          <p className="text-gray-500 text-base mt-1">
            {groups.present.length} present · {groups.absent.length} absent ·{" "}
            {groups.sick.length} sick · {groups.traveled.length} traveled
          </p>
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold capitalize transition ${
                detailView === key
                  ? `bg-${color}-500 text-white shadow-sm`
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
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["#", "Name", "Phone", "Email"].map((h) => (
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
                      className="border-b border-gray-50 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3 text-gray-400 text-xs font-mono">
                        {i + 1}
                      </td>
                      <td className="px-5 py-3 font-semibold text-primary">
                        {m.name ?? `${m.firstName ?? ""} ${m.lastName ?? ""}`}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{m.phone}</td>
                      <td className="px-5 py-3 text-gray-600">{m.email}</td>
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
      </div>

      {/* Filters + Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
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

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search by name, phone or card number…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition"
            />
          </div>
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
                  const present = record.presentCount ?? record.present ?? 0;
                  const absent = record.absentCount ?? record.absent ?? 0;
                  const sick = record.sickCount ?? record.sick ?? 0;
                  const traveled = record.traveledCount ?? record.traveled ?? 0;
                  const total = present + absent + sick + traveled;
                  const pct = total ? Math.round((present / total) * 100) : 0;

                  return (
                    <tr
                      key={record._id ?? idx}
                      className="border-b border-gray-50 hover:bg-blue-50/30 transition cursor-pointer"
                      onClick={() => setSelected(record)}
                    >
                      <td className="px-5 py-4 font-semibold text-primary whitespace-nowrap">
                        {String(date)}
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
                              className={`h-2 rounded-full ${
                                pct >= 75
                                  ? "bg-green-500"
                                  : pct >= 50
                                  ? "bg-orange-400"
                                  : "bg-red-400"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span
                            className={`text-sm font-bold ${
                              pct >= 75
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
    </div>
  );
};

export default AdminAttendance;
