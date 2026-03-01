import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";

const CONGREGATIONS = ["Nyanya", "Mararaba", "Karu", "Jikwoyi", "Dei-Dei"];

const field = (label, children, required) => (
    <div>
        <label className="block text-sm font-semibold text-gray-600 mb-1.5">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        {children}
    </div>
);

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base";

const AddMemberModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({
        name: "", phone: "", email: "", address: "",
        dateOfBaptism: "", homeCongregation: "Nyanya",
        dateOfBirth: "", gender: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.email || !form.address || !form.dateOfBaptism) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        // TODO: replace with real API
        await new Promise((r) => setTimeout(r, 1000));
        onAdd({ ...form, id: Date.now(), attendance: [] });
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-primary text-xl font-bold">Add New Member</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Required */}
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Required Information</p>

                    {field("Full Name", <input className={inputCls} placeholder="e.g. Grace Okonkwo" value={form.name} onChange={set("name")} />, true)}
                    <div className="grid grid-cols-2 gap-4">
                        {field("Phone Number", <input className={inputCls} placeholder="08012345678" value={form.phone} onChange={set("phone")} />, true)}
                        {field("Email Address", <input className={inputCls} type="email" placeholder="email@example.com" value={form.email} onChange={set("email")} />, true)}
                    </div>
                    {field("Address", <input className={inputCls} placeholder="Street, City" value={form.address} onChange={set("address")} />, true)}
                    <div className="grid grid-cols-2 gap-4">
                        {field("Date of Baptism", <input className={inputCls} type="date" value={form.dateOfBaptism} onChange={set("dateOfBaptism")} />, true)}
                        {field("Home Congregation", (
                            <select className={inputCls} value={form.homeCongregation} onChange={set("homeCongregation")}>
                                {CONGREGATIONS.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        ), true)}
                    </div>

                    {/* Optional */}
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mt-2">Optional</p>
                    <div className="grid grid-cols-2 gap-4">
                        {field("Date of Birth", <input className={inputCls} type="date" value={form.dateOfBirth} onChange={set("dateOfBirth")} />)}
                        {field("Gender", (
                            <select className={inputCls} value={form.gender} onChange={set("gender")}>
                                <option value="">Select…</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                    <div className="flex gap-3 mt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:border-gray-300 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-light transition flex items-center justify-center gap-2">
                            {loading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Saving…</> : "Add Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
