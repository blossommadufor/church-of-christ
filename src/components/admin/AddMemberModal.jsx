import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../CustomSelect";
import DateInput from "../DateInput";
import NaijaStates from "naija-state-local-government";
import { adminServices } from "../../services/adminServices";

const CONGREGATIONS = [
    "Nyanya", "Mararaba Aso", "Karu", "Jikwoyi", "One Man Village", "Abacha road"
];
const MINISTRIES = [
    "education", "marriage counselling", "building", "ict",
    "evangelism", "youth", "women", "welfare", "finance",
    "secretariate", "registry", "songs committee"
];

const PERMISSIONS = [
    { value: "DO_ALL",          label: "Super Admin (All Access)" },
    { value: "ATTENDANCE_VIEW", label: "View Attendance" },
    { value: "ATTENDANCE_MARK", label: "Mark Attendance" },
    { value: "FINANCE_VIEW",    label: "View Finance" },
    { value: "FINANCE_ADD",     label: "Add Finance Records" },
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

const AddMemberModal = ({ onClose, onAdd, initialData, isAdminPortal = true }) => {
    // Exact matched payload structure based on API
    // Exact matched payload structure based on API
    const [form, setForm] = useState(() => {
        if (initialData) {
            const fmtDate = (iso) => {
                if (!iso) return "";
                const d = new Date(iso);
                return isNaN(d) ? "" : d.toISOString().split('T')[0];
            };
            // Unflatten nextOfKin values for the bound inputs if updating
            return {
                ...initialData,
                dateBaptised: fmtDate(initialData.dateBaptised),
                dateJoined: fmtDate(initialData.dateJoined),
                nextOfKinName: initialData.nextOfKin?.name || "",
                nextOfKinPhone: initialData.nextOfKin?.phone || "",
                nextOfKinAddress: initialData.nextOfKin?.address || "",
                nextOfKinRelationship: initialData.nextOfKin?.relationship || "",
                ministries: initialData.ministries || [],
                roles: initialData.roles || ["MEMBER"],
                isActive: initialData.isActive ?? true,
                permissions: initialData.permissions || [],
            };
        }
        return {
            prefix: "BRO",
            firstName: "", lastName: "", email: "", phone: "",
            state: "", lga: "", gender: "male", maritalStatus: "single",
            preacherName: "", preacherContact: "",
            congregationLastWorship: "", interestAreaInChurch: "",
            dateBaptised: "", dateJoined: "", address: "",
            ministries: [], houseFellowship: "Nyanya", occupation: "",
            homeCongregation: "Nyanya", roles: ["MEMBER"], idCardNumber: "",
            isActive: true, permissions: [],
            nextOfKinName: "", nextOfKinPhone: "", nextOfKinAddress: "", nextOfKinRelationship: ""
        };
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // isAdmin: true if the member already has any permissions assigned
    const [isAdmin, setIsAdmin] = useState(
        () => (initialData?.permissions ?? []).length > 0
    );

    // Dynamic naija states setup
    const nigerianStates = NaijaStates.states().map((st) => ({
        value: st,
        label: st
    }));
    // Pre-populate LGA dropdown immediately if editing a member with a state already assigned
    const [lgas, setLgas] = useState(() => {
        if (initialData && initialData.state) {
            try {
                const localGovts = NaijaStates.lgas(initialData.state).lgas;
                return localGovts.map(lga => ({ value: lga, label: lga }));
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleMinistryToggle = (min) => {
        setForm(f => {
            const exists = f.ministries.includes(min);
            if (exists) return { ...f, ministries: f.ministries.filter(m => m !== min) };
            return { ...f, ministries: [...f.ministries, min] };
        });
    };

    const handleStateChange = (selectedOption) => {
        setForm(f => ({ ...f, state: selectedOption ? selectedOption.value : "", lga: "" }));
        if (selectedOption) {
            const localGovts = NaijaStates.lgas(selectedOption.value).lgas;
            setLgas(localGovts.map(lga => ({ value: lga, label: lga })));
        } else {
            setLgas([]);
        }
    };

    const handleLgaChange = (selectedOption) => {
        setForm(f => ({ ...f, lga: selectedOption ? selectedOption.value : "" }));
    };

    const handleAdminToggle = (checked) => {
        setIsAdmin(checked);
        setForm(f => ({
            ...f,
            roles: checked ? ["MEMBER", "ADMIN"] : ["MEMBER"],
            permissions: checked ? (f.permissions ?? []) : [],
        }));
    };

    const handlePermissionToggle = (perm) => {
        setForm(f => {
            const current = f.permissions ?? [];
            const exists = current.includes(perm);
            return {
                ...f,
                permissions: exists
                    ? current.filter(p => p !== perm)
                    : [...current, perm],
            };
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
                address: form.nextOfKinAddress,
                relationship: form.nextOfKinRelationship
            }
        };

        // Remove the flattened next of kin strings from standard payload
        delete payload.nextOfKinName;
        delete payload.nextOfKinPhone;
        delete payload.nextOfKinAddress;
        delete payload.nextOfKinRelationship;

        setLoading(true);
        try {
            if (initialData && (initialData._id || initialData.id)) {
                // UPDATE logic
                const memberId = initialData._id || initialData.id;
                await adminServices.updateMember(memberId, payload);
                onAdd({ ...payload, id: memberId, _id: memberId, isUpdate: true });
            } else {
                // ADD logic
                const data = await adminServices.registerMember(payload);
                onAdd({ ...payload, id: data?._id || Date.now() });
            }
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
                    <h2 className="text-primary text-xl font-bold">{initialData ? "Update Member Profile" : "Register New Member"}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Basic Info */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Basic Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {field("Prefix", (
                                <select className={inputCls} value={form.prefix} onChange={set("prefix")}>
                                    <option value="BRO">BRO</option>
                                    <option value="SIS">SIS</option>
                                </select>
                            ), true)}
                            {field("First Name", <input className={inputCls} placeholder="Enter first name" value={form.firstName} onChange={set("firstName")} />, true)}
                            {field("Last Name", <input className={inputCls} placeholder="Enter last name" value={form.lastName} onChange={set("lastName")} />, true)}
                            {field("Phone Number", <input className={inputCls} placeholder="Enter phone number" value={form.phone} onChange={set("phone")} />, true)}
                            {field("Email Address", <input className={inputCls} type="email" placeholder="Enter email address" value={form.email} onChange={set("email")} />)}
                            {field("Occupation", <input className={inputCls} placeholder="Enter occupation" value={form.occupation} onChange={set("occupation")} />)}

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
                            {field("State", (
                                <CustomSelect
                                    options={nigerianStates}
                                    placeholder="Select State..."
                                    value={nigerianStates.find(opt => opt.value === form.state) || null}
                                    onChange={handleStateChange}
                                    isClearable
                                />
                            ))}
                            {field("LGA", (
                                <CustomSelect
                                    options={lgas}
                                    placeholder="Select LGA..."
                                    value={lgas.find(opt => opt.value === form.lga) || null}
                                    onChange={handleLgaChange}
                                    isDisabled={!form.state}
                                    isClearable
                                />
                            ))}
                        </div>
                        <div className="mt-4">
                            {field("Address", <input className={inputCls} placeholder="Enter full address" value={form.address} onChange={set("address")} />, true)}
                        </div>
                    </div>

                    {/* Church Info */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Church Details</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {field("Date Baptised", <DateInput className={inputCls} value={form.dateBaptised} onChange={set("dateBaptised")} />, true)}
                            {field("Date Joined", <DateInput className={inputCls} value={form.dateJoined} onChange={set("dateJoined")} />)}
                            {field("Home Congregation", <input className={inputCls} placeholder="Enter congregation name" value={form.homeCongregation} onChange={set("homeCongregation")} />)}
                            {field("Previous Congregation (Optional)", <input className={inputCls} placeholder="Where did you worship last?" value={form.congregationLastWorship} onChange={set("congregationLastWorship")} />)}
                            {field("Preacher Name (Optional)", <input className={inputCls} placeholder="Enter preacher name" value={form.preacherName} onChange={set("preacherName")} />)}
                            {field("Preacher Contact (Optional)", <input className={inputCls} placeholder="Enter preacher contact" value={form.preacherContact} onChange={set("preacherContact")} />)}

                            {field("House Fellowship", (
                                <select className={inputCls} value={form.houseFellowship} onChange={set("houseFellowship")}>
                                    {CONGREGATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            ))}
                            {field("ID Card Number", <input className={inputCls} placeholder="Enter ID number" value={form.idCardNumber} onChange={set("idCardNumber")} />)}
                            {isAdminPortal && field("Member Status", (
                                <select className={inputCls} value={form.isActive ? "active" : "inactive"} onChange={(e) => setForm(f => ({ ...f, isActive: e.target.value === "active" }))}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            ))}
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

                    {/* Next of Kin */}
                    <div>
                        <p className="text-sm text-primary font-bold uppercase tracking-widest mb-3 border-b pb-1">Next of Kin</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {field("Next of Kin Name", <input className={inputCls} placeholder="Enter full name" value={form.nextOfKinName} onChange={set("nextOfKinName")} />)}
                            {field("Relationship", <input className={inputCls} placeholder="e.g. Spouse, Sibling" value={form.nextOfKinRelationship} onChange={set("nextOfKinRelationship")} />)}
                            {field("Next of Kin Phone", <input className={inputCls} placeholder="Enter phone number" value={form.nextOfKinPhone} onChange={set("nextOfKinPhone")} />)}
                            {field("Next of Kin Address", <input className={inputCls} placeholder="Enter address" value={form.nextOfKinAddress} onChange={set("nextOfKinAddress")} />)}
                        </div>
                    </div>

                    {/* Admin Access — admin portal only */}
                    {isAdminPortal && (
                    <div className="border border-gray-100 rounded-2xl p-5 bg-gray-50">
                        <label className="flex items-center gap-3 cursor-pointer select-none">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isAdmin}
                                    onChange={(e) => handleAdminToggle(e.target.checked)}
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${isAdmin ? "bg-primary" : "bg-gray-300"}`} />
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isAdmin ? "translate-x-5" : "translate-x-0"}`} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-700">Grant Admin Access</p>
                                <p className="text-xs text-gray-400 mt-0.5">This member will have an admin role with selected permissions</p>
                            </div>
                        </label>

                        {isAdmin && (
                            <div className="mt-5">
                                <p className="text-sm font-semibold text-gray-600 mb-3">Select Permissions</p>
                                <div className="flex flex-wrap gap-2">
                                    {PERMISSIONS.map(({ value, label }) => {
                                        const selected = (form.permissions ?? []).includes(value);
                                        return (
                                            <button
                                                type="button"
                                                key={value}
                                                onClick={() => handlePermissionToggle(value)}
                                                className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                                                    selected
                                                        ? "bg-primary border-primary text-white"
                                                        : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                                                }`}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                                {(form.permissions ?? []).length === 0 && (
                                    <p className="text-xs text-orange-500 mt-3 font-medium">⚠ No permissions selected — admin will have no access rights.</p>
                                )}
                            </div>
                        )}
                    </div>
                    )}

                    {error && <p className="text-red-500 text-sm font-medium mt-2 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

                    <div className="flex gap-3 mt-4 pt-4 border-t pb-2">
                        <button type="button" onClick={onClose}
                            className="flex-[0.5] py-3.5 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:border-gray-300 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="flex-1 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-light transition flex items-center justify-center gap-2">
                            {loading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> {initialData ? "Saving…" : "Registering…"}</> : (initialData ? "Save Changes" : "Register Member")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
