import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AdminQuestionDetailModal from "../../components/admin/AdminQuestionDetailModal";

// Mock data (Pending, Answered, Spam)
const initialQuestions = [
    {
        id: 1,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "08012345678",
        category: "Baptism",
        question: "Hi, I am interested in getting baptized this coming Sunday. What are the requirements and classes I need to take beforehand?",
        status: "Pending",
        date: "2023-10-24"
    },
    {
        id: 2,
        name: "Michael Johnson",
        email: "mike.j@example.com",
        phone: "09087654321",
        category: "Doctrine",
        question: "Could you explain the church's specific stance on instrumental music during worship? I'd love to understand the scriptural basis for a cappella singing.",
        status: "Answered",
        date: "2023-10-22"
    },
    {
        id: 3,
        name: "Anonymous User",
        email: "",
        phone: "07011223344",
        category: "Marriage",
        question: "I want to speak with one of the elders about pre-marital counseling. How do we book an appointment?",
        status: "Pending",
        date: "2023-10-21"
    },
    {
        id: 4,
        name: "Spam Bot",
        email: "buyCrypto@spam.net",
        phone: "",
        category: "Other",
        question: "Click here to win a free iPhone and claim your 1000 BTC. Fast payout!",
        status: "Spam",
        date: "2023-10-20"
    }
];

const AdminQuestions = () => {
    const [questions, setQuestions] = useState(initialQuestions);
    const [search, setSearch] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // Derived state
    const filteredQuestions = questions.filter(q =>
        q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.category.toLowerCase().includes(search.toLowerCase()) ||
        q.question.toLowerCase().includes(search.toLowerCase())
    );

    const pendingCount = questions.filter(q => q.status === "Pending").length;

    const handleUpdateStatus = (id, newStatus) => {
        setQuestions(prev => prev.map(q =>
            q.id === id ? { ...q, status: newStatus } : q
        ));
        // Also update the active modal object so it refreshes immediately
        setSelectedQuestion(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
    };

    const getStatusStyle = (status) => {
        if (status === "Answered") return "bg-green-100 text-green-700";
        if (status === "Spam") return "bg-red-100 text-red-700";
        return "bg-yellow-100 text-yellow-700";
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-primary text-2xl font-bold">Questions</h1>
                    <p className="text-gray-500 text-base mt-1">
                        {pendingCount} {pendingCount === 1 ? 'question' : 'questions'} pending review
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="relative max-w-md">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, category, or question content..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {["Date", "Name", "Category", "Preview", "Status", "Actions"].map((h) => (
                                    <th key={h} className="text-left text-gray-500 font-semibold px-5 py-4 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-400 text-base">
                                        No questions found.
                                    </td>
                                </tr>
                            ) : filteredQuestions.map((q) => (
                                <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{new Date(q.date).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</td>
                                    <td className="px-5 py-4 font-semibold text-primary whitespace-nowrap">{q.name}</td>
                                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{q.category}</td>
                                    <td className="px-5 py-4 text-gray-500 max-w-xs truncate" title={q.question}>
                                        {q.question}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(q.status)}`}>
                                            {q.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedQuestion(q)}
                                            className="p-2 rounded-lg text-light hover:bg-light/10 transition"
                                            title="View Details"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            <AdminQuestionDetailModal
                isOpen={!!selectedQuestion}
                onClose={() => setSelectedQuestion(null)}
                question={selectedQuestion}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    );
};

export default AdminQuestions;
