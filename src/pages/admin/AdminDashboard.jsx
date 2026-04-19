import React, { useState, useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCheckCircle,
  faTimesCircle,
  faChartLine,
  faPercent,
  faLightbulb,
  faChevronDown,
  faCalendarDays,
  faXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { adminServices } from "../../services/adminServices";
import LocationCaptureModal from "../../components/admin/LocationCaptureModal";
import { formatDate, formatMonth } from "../../utils/analyticsUtils";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
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

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 8 }, (_, i) => currentYear - 4 + i);

const PRESETS = [
  { key: "year", label: "This Year" },
  { key: "month", label: "This Month" },
  { key: "last_sunday", label: "Last Sunday" },
  { key: "today", label: "Today", condition: () => new Date().getDay() === 0 },
  { key: "custom", label: "Custom…" },
];

// ─── Derive API params from a preset/custom selection ─────────────────────────

const paramsFromFilter = (filter) => {
  const now = new Date();
  if (filter.preset === "year") {
    return { year: now.getFullYear() };
  }
  if (filter.preset === "month") {
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  if (filter.preset === "today") {
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.toISOString().split("T")[0],
    };
  }
  if (filter.preset === "last_sunday") {
    const lastSunday = new Date(now);
    // If today is Sunday (0), last Sunday is 7 days ago. Otherwise, it's the `getDay()` offset.
    const diff = lastSunday.getDay() === 0 ? 7 : lastSunday.getDay();
    lastSunday.setDate(lastSunday.getDate() - diff);
    return {
      year: lastSunday.getFullYear(),
      month: lastSunday.getMonth() + 1,
      date: lastSunday.toISOString().split("T")[0],
    };
  }
  // custom
  const { year, month, day } = filter;
  const params = {};
  if (year) params.year = year;
  if (month) params.month = month;
  if (day && month && year) {
    params.date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }
  return params;
};

// ─── Label for the trigger button ────────────────────────────────────────────

const filterLabel = (filter) => {
  if (filter.preset === "year") return "This Year";
  if (filter.preset === "month") return "This Month";
  if (filter.preset === "last_sunday") return "Last Sunday";
  if (filter.preset === "today") return "Today";
  // custom
  const { year, month, day } = filter;
  const parts = [];
  if (day && month && year) return formatDate(day, month, year);
  if (month && year) return `${MONTHS[month - 1]?.label} ${year}`;
  if (year) return `${year}`;
  return "Custom";
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
    <div className="w-10 h-10 bg-gray-200 rounded-xl mb-3" />
    <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
    <div className="h-7 bg-gray-200 rounded w-1/2" />
  </div>
);

// ─── Summary Card ─────────────────────────────────────────────────────────────

const SummaryCard = ({ icon, label, value, color, textColor }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      <FontAwesomeIcon icon={icon} className="text-sm text-white" />
    </div>
    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">{label}</p>
    <p className={`text-3xl font-bold ${textColor || "text-primary"}`}>{value ?? "—"}</p>
  </div>
);

// ─── Custom Date Modal ────────────────────────────────────────────────────────

const CustomDateModal = ({ onApply, onClose, initial }) => {
  const [year, setYear] = useState(initial?.year ?? currentYear);
  const [month, setMonth] = useState(initial?.month ?? "");
  const [day, setDay] = useState(initial?.day ?? "");

  const handleApply = () => {
    onApply({ preset: "custom", year: Number(year), month: month ? Number(month) : undefined, day: day ? Number(day) : undefined });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 flex flex-col gap-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-light/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarDays} className="text-light text-base" />
            </div>
            <h2 className="text-primary font-bold text-lg">Select Date Range</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-600 text-sm font-semibold">Year</label>
          <select
            value={year}
            onChange={(e) => { setYear(e.target.value); setMonth(""); setDay(""); }}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition cursor-pointer"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Month (optional) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-600 text-sm font-semibold">
            Month <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <select
            value={month}
            onChange={(e) => { setMonth(e.target.value); setDay(""); }}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition cursor-pointer"
          >
            <option value="">All months</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        {/* Day (optional, only if month selected) */}
        {month && (
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-600 text-sm font-semibold">
              Day <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              min={1}
              max={31}
              placeholder="e.g. 15"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition w-full"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 text-sm font-semibold hover:border-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-light transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

const FilterDropdown = ({ filter, onChange }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handlePreset = (preset) => {
    if (preset === "custom") {
      setOpen(false);
      setShowModal(true);
    } else {
      onChange({ preset });
      setOpen(false);
    }
  };

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:border-light hover:text-light transition"
        >
          <FontAwesomeIcon icon={faCalendarDays} className="text-light text-xs" />
          {filterLabel(filter)}
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden py-1">
            {PRESETS.filter((p) => !p.condition || p.condition()).map((p) => (
              <button
                key={p.key}
                onClick={() => handlePreset(p.key)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition hover:bg-gray-50 ${filter.preset === p.key && p.key !== "custom"
                  ? "text-light font-semibold bg-light/5"
                  : "text-gray-700"
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CustomDateModal
          initial={{ year: currentYear }}
          onApply={onChange}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const now = new Date();
  const [filter, setFilter] = useState({ preset: "year" });
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setAnalytics(null);
      try {
        const params = paramsFromFilter(filter);
        const res = await adminServices.getAttendanceAnalytics(params);
        setAnalytics(res?.data ?? null);
      } catch (err) {
        console.error("[Analytics Error]:", err);
        setAnalytics(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
    // const fetchMemberAnalytics = async () => {
    //   setIsLoading(true);
    //   setAnalytics(null);
    //   try {
    //     const params = paramsFromFilter(filter);
    //     const res = await adminServices.getMemberAnalytics(params);
    //     console.log("Member Analytics", res)
    //   } catch (err) {
    //     console.error("[Member Error]:", err);
    //     setAnalytics(null);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchMemberAnalytics();
  }, [filter]);

  // ── Derived Data ───────────────────────────────────────────────────────────

  const summary = analytics?.summary ?? {};
  const trends = analytics?.trends ?? {};
  const serviceBreakdown = analytics?.serviceBreakdown ?? [];
  const insights = analytics?.insights ?? {};
  const hasData = !!analytics;

  // ── Chart Options ──────────────────────────────────────────────────────────

  const dailyChartOption = {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "category",
      data: (trends.daily ?? []).map(
        (item) =>
          `${String(item._id?.day).padStart(2, "0")}/${String(item._id?.month).padStart(2, "0")}`
      ),
      axisLabel: { fontSize: 11, color: "#9ca3af" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: { fontSize: 11, color: "#9ca3af" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        data: (trends.daily ?? []).map((item) => item.count),
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: "#4663D8", width: 2.5 },
        itemStyle: { color: "#4663D8" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(70,99,216,0.18)" },
              { offset: 1, color: "rgba(70,99,216,0)" },
            ],
          },
        },
      },
    ],
  };

  const monthlyChartOption = {
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "category",
      data: (trends.monthly ?? []).map((item) =>
        formatMonth(item._id?.month ?? item._id)
      ),
      axisLabel: { fontSize: 11, color: "#9ca3af" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      axisLabel: { fontSize: 11, color: "#9ca3af" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        data: (trends.monthly ?? []).map((item) => item.count),
        type: "bar",
        barMaxWidth: 40,
        itemStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: "#4663D8" },
              { offset: 1, color: "#26294D" },
            ],
          },
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };

  const pieChartOption = {
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      textStyle: { fontSize: 11, color: "#6b7280" },
    },
    series: [
      {
        type: "pie",
        radius: ["45%", "72%"],
        center: ["38%", "50%"],
        data: serviceBreakdown.map((item) => ({
          name: item._id ?? item.name ?? "Unknown",
          value: item.count ?? item.value ?? 0,
        })),
        itemStyle: { borderRadius: 6, borderWidth: 2, borderColor: "#fff" },
        label: { show: false },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0,0,0,0.2)" },
        },
        color: ["#4663D8", "#26294D", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"],
      },
    ],
  };

  // ── Insights ───────────────────────────────────────────────────────────────

  const topDay = insights.topAttendanceDay;
  const topDayFormatted = topDay
    ? formatDate(topDay._id?.day, topDay._id?.month, topDay._id?.year)
    : null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-primary text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-base mt-1">
            Attendance analytics for the congregation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:border-primary hover:text-primary transition"
          >
            <FontAwesomeIcon icon={faLocationDot} className="text-primary text-xs" />
            Set Location
          </button>
          <FilterDropdown filter={filter} onChange={setFilter} />
        </div>
      </div>

      <LocationCaptureModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      {/* ── Summary Cards ── */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : !hasData ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-base font-medium">
            No data available for the selected period.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <SummaryCard
              icon={faUsers}
              label="Total Members"
              value={summary.totalMembers}
              color="bg-primary"
            />
            <SummaryCard
              icon={faCheckCircle}
              label="Active Members"
              value={summary.totalActiveMembers}
              color="bg-green-500"
              textColor="text-green-600"
            />
            <SummaryCard
              icon={faCheckCircle}
              label="Total Attendance"
              value={summary.totalAttendance}
              color="bg-purple-500"
              textColor="text-purple-600"
            />
            <SummaryCard
              icon={faTimesCircle}
              label="Total Absentees"
              value={summary.totalAbsentees}
              color="bg-red-400"
              textColor="text-red-500"
            />
            <SummaryCard
              icon={faChartLine}
              label="Attendance %"
              value={
                summary.attendancePercentage
              }
              color="bg-light"
              textColor="text-light"
            />
            <SummaryCard
              icon={faPercent}
              label="Absence %"
              value={
                summary.absentPercentage
              }
              color="bg-orange-400"
              textColor="text-orange-500"
            />
          </div>

          {/* ── Daily Trend ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-primary font-bold text-base mb-5">
              Daily Attendance Trend
            </h2>
            {(trends.daily ?? []).length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-10">
                No daily data for this period.
              </p>
            ) : (
              <ReactECharts
                option={dailyChartOption}
                style={{ height: "280px", width: "100%" }}
                opts={{ renderer: "svg" }}
              />
            )}
          </div>

          {/* ── Monthly + Pie ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-primary font-bold text-base mb-5">
                Monthly Attendance
              </h2>
              {(trends.monthly ?? []).length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-10">
                  No monthly data for this period.
                </p>
              ) : (
                <ReactECharts
                  option={monthlyChartOption}
                  style={{ height: "260px", width: "100%" }}
                  opts={{ renderer: "svg" }}
                />
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-primary font-bold text-base mb-5">
                Service Breakdown
              </h2>
              {serviceBreakdown.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-10">
                  No service data for this period.
                </p>
              ) : (
                <ReactECharts
                  option={pieChartOption}
                  style={{ height: "260px", width: "100%" }}
                  opts={{ renderer: "svg" }}
                />
              )}
            </div>
          </div>

          {/* ── Insights ── */}
          {(insights.averageAttendance != null || topDayFormatted) && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-amber-500 text-sm"
                  />
                </div>
                <h2 className="text-primary font-bold text-base">Insights</h2>
              </div>
              <div className="space-y-3">
                {insights.averageAttendance != null && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-light mt-0.5">•</span>
                    <p className="text-gray-700 text-sm">
                      Average attendance:{" "}
                      <span className="font-semibold text-primary">
                        {Number(insights.averageAttendance).toFixed(2)} per service
                      </span>
                    </p>
                  </div>
                )}
                {topDayFormatted && (
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-light mt-0.5">•</span>
                    <p className="text-gray-700 text-sm">
                      Highest attendance was on{" "}
                      <span className="font-semibold text-primary">
                        {topDayFormatted}
                      </span>{" "}
                      with{" "}
                      <span className="font-semibold text-primary">
                        {topDay.count} attendee{topDay.count !== 1 ? "s" : ""}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
