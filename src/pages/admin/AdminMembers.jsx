import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass, faPlus, faCloudArrowUp,
    faEye, faTrash, faChevronLeft, faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import AddMemberModal from "../../components/admin/AddMemberModal";
import BulkUploadModal from "../../components/admin/BulkUploadModal";
import { adminServices } from "../../services/adminServices";

const PAGE_SIZE = 10;

const AdminMembers = () => {
    // Swap out dummyMembers for live API state
    const [members, setMembers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [deleting, setDeleting] = useState(null);

    // Fetch Members API whenever page or search changes
    React.useEffect(() => {
        const fetchMembers = async () => {
            setIsLoading(true);
            try {
                // Use the API Pagination params provided
                const qs = `?searchByEmail=${search}&searchByName=${search}&pageNumber=${page}&searchByPhone=${search}`;
                const res = await adminServices.getAllMembers(qs);

                // Map the nested `member` object structure from the backend
                if (res?.data?.users) {
                    setMembers(res.data.users);
                    setTotalPages(res.data.pages || 1);
                    setTotalMembers(res.data.userCount || 0);
                }
            } catch (err) {
                console.error("[API Get Members Error]:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMembers();
    }, [page, search]);

    const handleSearch = (v) => { setSearch(v); setPage(1); };
    const handleAdd = (m) => { setMembers((prev) => [{ ...m, id: Date.now() }, ...prev]); setShowAdd(false); };
    const handleUploaded = (rows) => {
        const newMembers = rows.map((r, i) => ({
            id: Date.now() + i, name: r.name, phone: r.phone, email: r.email,
            address: r.address, dateOfBaptism: r.date_of_baptism,
            homeCongregation: r.home_congregation, dateOfBirth: r.date_of_birth,
            gender: r.gender, attendance: [],
        }));
        setMembers((prev) => [...newMembers, ...prev]);
    };
    const confirmDelete = (id) => { setMembers((prev) => prev.filter((m) => m.id !== id)); setDeleting(null); };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-primary text-2xl font-bold">Members</h1>
                    <p className="text-gray-500 text-base mt-1">{totalMembers} registered members</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button onClick={() => setShowUpload(true)}
                        className="flex items-center gap-2 px-4 py-2.5 border-2 border-light text-light font-semibold rounded-xl hover:bg-light hover:text-white transition text-base">
                        <FontAwesomeIcon icon={faCloudArrowUp} /> Bulk Upload
                    </button>
                    <button onClick={() => setShowAdd(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-light transition text-base">
                        <FontAwesomeIcon icon={faPlus} /> Add Member
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="relative max-w-md">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search by name, phone, email or congregation…"
                        value={search} onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>{["Name", "Phone", "Email", "Role", "Gender", "Baptism Date", "Actions"].map((h) => (
                                <th key={h} className="text-left text-gray-500 font-semibold px-5 py-4">{h}</th>
                            ))}</tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={7} className="text-center py-16 text-gray-400 text-base">Loading members...</td></tr>
                            ) : members.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-16 text-gray-400 text-base">No members found.</td></tr>
                            ) : members.map((user) => {
                                const m = user.member || {};
                                return (
                                    <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                        <td className="px-5 py-4 font-semibold text-primary whitespace-nowrap">{m.firstName} {m.lastName}</td>
                                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{m.phone}</td>
                                        <td className="px-5 py-4 text-gray-600">{m.email}</td>
                                        <td className="px-5 py-4 text-xs font-bold text-gray-500 uppercase">{user.role}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${m.gender?.toLowerCase() === "female" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
                                                }`}>{m.gender || "—"}</span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                                            {m.dateBaptised ? new Date(m.dateBaptised).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                {/* Pass minimal needed data to detail view via state if there is no immediate fetch by ID route */}
                                                <Link to={`/admin/members/${user._id}`} state={{ user }}
                                                    className="p-2 rounded-lg text-light hover:bg-light/10 transition" title="View">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                                <button onClick={() => setDeleting(user._id)}
                                                    className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition" title="Delete">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-5 py-4 flex items-center justify-between border-t border-gray-100">
                    <p className="text-gray-500 text-sm">
                        Showing Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-light hover:text-light disabled:opacity-40 transition">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-light hover:text-light disabled:opacity-40 transition">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete confirmation */}
            {deleting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setDeleting(null)} />
                    <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
                        <p className="text-primary font-bold text-lg mb-2">Delete Member?</p>
                        <p className="text-gray-500 text-base mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleting(null)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:border-gray-300 transition">Cancel</button>
                            <button onClick={() => confirmDelete(deleting)} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {showAdd && <AddMemberModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
            {showUpload && <BulkUploadModal onClose={() => setShowUpload(false)} onUploaded={handleUploaded} />}
        </div>
    );
};

export default AdminMembers;
