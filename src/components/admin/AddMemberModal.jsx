import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { adminServices } from "../../services/adminServices";

const CONGREGATIONS = [
    "Nyanya", "Mararaba Aso", "Karu", "Jikwoyi", "One Man Village", "Abacha road"
];
const MINISTRIES = [
    "education", "marriage counselling", "building", "ict",
    "evangelism", "youth", "women", "welfare", "finance",
    "secretariate", "registry", "songs committee"
];

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
    // Exact matched payload structure based on API
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        state: "", lga: "", gender: "male", maritalStatus: "single",
        preacherName: "", preacherContact: "",
        congregationLastWorship: "", interestAreaInChurch: "",
        dateBaptised: "", dateJoined: "", address: "",
        ministries: [], houseFellowship: "Nyanya", occupation: "",
        homeCongregation: "Nyanya", roles: ["MEMBER"], idCardNumber: "",
        nextOfKinName: "", nextOfKinPhone: "", nextOfKinAddress: "" // flattened for easy binding
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleMinistryToggle = (min) => {
        setForm(f => {
            const exists = f.ministries.includes(min);
            if (exists) return { ...f, ministries: f.ministries.filter(m => m !== min) };
            return { ...f, ministries: [...f.ministries, min] };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.firstName || !form.lastName || !form.phone || !form.address || !form.dateBaptised) {
            setError("Please fill in the core required fields (Name, Phone, Address, Date Baptised).");
            return;
        }

        const payload = {
            ...form,
            nextOfKin: {
                name: form.nextOfKinName,
                phone: form.nextOfKinPhone,
                address: form.nextOfKinAddress
            }
        };

        // Remove the flattened next of kin strings from standard payload
        delete payload.nextOfKinName;
        delete payload.nextOfKinPhone;
        delete payload.nextOfKinAddress;

        setLoading(true);
        try {
            const data = await adminServices.registerMember(payload);
            // Simulate adding member locally so the UI updates
            onAdd({ ...payload, id: data?._id || Date.now() });
        } catch (err) {
            setError(err.message || "Failed to register member.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40" />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-primary text-xl font-bold">Register New Member</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Basic Info */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Basic Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {field("First Name", <input className={inputCls} placeholder="e.g. Charles" value={form.firstName} onChange={set("firstName")} />, true)}
                            {field("Last Name", <input className={inputCls} placeholder="e.g. Amos" value={form.lastName} onChange={set("lastName")} />, true)}
                            {field("Phone Number", <input className={inputCls} placeholder="08012345678" value={form.phone} onChange={set("phone")} />, true)}
                            {field("Email Address", <input className={inputCls} type="email" placeholder="email@example.com" value={form.email} onChange={set("email")} />)}

                            {field("Gender", (
                                <select className={inputCls} value={form.gender} onChange={set("gender")}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            ))}
                            {field("Marital Status", (
                                <select className={inputCls} value={form.maritalStatus} onChange={set("maritalStatus")}>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="seperated">Separated</option>
                                </select>
                            ))}
                            {field("State", <input className={inputCls} placeholder="e.g. Rivers" value={form.state} onChange={set("state")} />)}
                            {field("LGA", <input className={inputCls} placeholder="e.g. Andoni" value={form.lga} onChange={set("lga")} />)}
                        </div>
                        <div className="mt-4">
                            {field("Address", <input className={inputCls} placeholder="Street, City" value={form.address} onChange={set("address")} />, true)}
                        </div>
                    </div>

                    {/* Church Info */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Church Details</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {field("Date Baptised", <input className={inputCls} placeholder="22 February 2004" value={form.dateBaptised} onChange={set("dateBaptised")} />, true)}
                            {field("Date Joined", <input className={inputCls} placeholder="4 August 2004" value={form.dateJoined} onChange={set("dateJoined")} />)}
                            {field("Home Congregation", <input className={inputCls} placeholder="e.g. Assarama coc" value={form.homeCongregation} onChange={set("homeCongregation")} />)}
                            {field("Previous Congregation", <input className={inputCls} placeholder="Where did you worship last?" value={form.congregationLastWorship} onChange={set("congregationLastWorship")} />)}
                            {field("Preacher Name", <input className={inputCls} placeholder="e.g. Isirimah" value={form.preacherName} onChange={set("preacherName")} />)}
                            {field("Preacher Contact", <input className={inputCls} placeholder="08073654234" value={form.preacherContact} onChange={set("preacherContact")} />)}

                            {field("House Fellowship", (
                                <select className={inputCls} value={form.houseFellowship} onChange={set("houseFellowship")}>
                                    {CONGREGATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            ))}
                            {field("ID Card Number", <input className={inputCls} placeholder="003" value={form.idCardNumber} onChange={set("idCardNumber")} />)}
                        </div>
                    </div>

                    {/* Involvement */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Involvement & Ministries</p>
                        <div className="mb-4">
                            {field("Interest Area in Church", <input className={inputCls} placeholder="e.g. Praying" value={form.interestAreaInChurch} onChange={set("interestAreaInChurch")} />)}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Select Ministries</label>
                            <div className="flex flex-wrap gap-2">
                                {MINISTRIES.map(min => (
                                    <button
                                        type="button"
                                        key={min}
                                        onClick={() => handleMinistryToggle(min)}
                                        className={`px-3 py-1.5 rounded-full border text-sm capitalize transition-colors ${form.ministries.includes(min)
                                            ? "bg-primary border-primary text-white"
                                            : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                                            }`}
                                    >
                                        {min}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Next of Kin & Employment */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Next of Kin & Occupation</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {field("Occupation", <input className={inputCls} placeholder="e.g. Tech bro" value={form.occupation} onChange={set("occupation")} />)}
                            {field("Next of Kin Name", <input className={inputCls} placeholder="e.g. Debby London" value={form.nextOfKinName} onChange={set("nextOfKinName")} />)}
                            {field("Next of Kin Phone", <input className={inputCls} placeholder="09877636323" value={form.nextOfKinPhone} onChange={set("nextOfKinPhone")} />)}
                            {field("Next of Kin Address", <input className={inputCls} placeholder="Karu Abuja" value={form.nextOfKinAddress} onChange={set("nextOfKinAddress")} />)}
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

                    <div className="flex gap-3 mt-4 pt-4 border-t pb-2">
                        <button type="button" onClick={onClose}
                            className="flex-[0.5] py-3.5 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:border-gray-300 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-light transition flex items-center justify-center gap-2">
                            {loading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Registering…</> : "Register Member"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
