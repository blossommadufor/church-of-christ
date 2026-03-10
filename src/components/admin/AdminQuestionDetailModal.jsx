import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faBan, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

// question: { id, name, email, phone, category, question, status, date }
const AdminQuestionDetailModal = ({ isOpen, onClose, question, onUpdateStatus }) => {
    if (!isOpen || !question) return null;

    const getStatusStyle = (status) => {
        if (status === "Answered") return "bg-green-100 text-green-700";
        if (status === "Spam") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-primary">Question Details</h2>
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${getStatusStyle(question.status)}`}>
                            {question.status}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
                        <FontAwesomeIcon icon={faXmark} className="text-xl" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>

                    {/* Meta Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-light/10 text-light flex items-center justify-center shrink-0">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Sender</p>
                                <p className="font-semibold text-gray-800 text-sm">{question.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-light/10 text-light flex items-center justify-center shrink-0">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="truncate">
                                <p className="text-xs text-gray-400 font-semibold uppercase">Email</p>
                                <p className="font-semibold text-gray-800 text-sm truncate">{question.email || "Not Provided"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-10 h-10 rounded-full bg-light/10 text-light flex items-center justify-center shrink-0">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-semibold uppercase">Phone</p>
                                <p className="font-semibold text-gray-800 text-sm">{question.phone || "Not Provided"}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <p className="text-xs text-gray-400 font-semibold uppercase mb-0.5">Category & Date</p>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-800 text-sm">{question.category}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-gray-500 text-sm">{question.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Question Content */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Question</h3>
                        <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {question.question}
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3 border-t border-gray-100 sm:justify-end">
                    {question.status !== "Spam" && (
                        <button
                            onClick={() => onUpdateStatus(question.id, "Spam")}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 hover:border-red-300 transition text-sm"
                        >
                            <FontAwesomeIcon icon={faBan} /> Mark as Spam
                        </button>
                    )}

                    {question.status !== "Answered" && (
                        <button
                            onClick={() => onUpdateStatus(question.id, "Answered")}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-light text-white font-semibold hover:bg-blue-600 transition shadow-md shadow-light/20 text-sm"
                        >
                            <FontAwesomeIcon icon={faCheck} /> Mark as Answered
                        </button>
                    )}

                    {/* If marked answering or spam, give option to revert to Pending */}
                    {question.status !== "Pending" && (
                        <button
                            onClick={() => onUpdateStatus(question.id, "Pending")}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 hover:bg-gray-100 transition text-sm"
                        >
                            Revert to Pending
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminQuestionDetailModal;
