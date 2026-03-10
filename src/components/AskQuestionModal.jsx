import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";

const AskQuestionModal = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        category: "Doctrine",
        question: ""
    });
    const [status, setStatus] = useState("idle"); // idle, submitting, success

    if (!isOpen) return null;

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.category || !form.question) return;

        setStatus("submitting");

        // Mocking an API submission
        setTimeout(() => {
            console.log("[Mock API] Question Submitted:", form);
            setStatus("success");
        }, 1200);
    };

    const handleClose = () => {
        // Reset state on full closure so it's fresh for next open
        setTimeout(() => {
            setForm({ name: "", email: "", phone: "", category: "Doctrine", question: "" });
            setStatus("idle");
        }, 300);
        onClose();
    };

    const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-light focus:ring-2 focus:ring-light/20 transition text-base";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={handleClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

            {/* Modal Pane */}
            <div
                className="relative bg-white rounded-xl sm:rounded-3xl shadow-2xl w-full max-w-[720px] max-h-[90vh] overflow-y-auto transform transition-all p-6 sm:p-8 my-4 sm:my-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button line */}
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-700 transition"
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                    </button>
                </div>

                {status === "success" ? (
                    <div className="flex flex-col items-center text-center py-10 px-4">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-light text-6xl mb-6" />
                        <h3 className="text-primary text-2xl font-bold mb-2">Question Submitted!</h3>
                        <p className="text-gray-500 text-base mb-8">
                            Thank you for reaching out. A member of our team will review your question and respond to you shortly.
                        </p>
                        <button
                            onClick={handleClose}
                            className="w-full py-4 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-primary text-3xl font-bold">Ask a Question</h2>
                            <p className="text-gray-500 text-base mt-2">
                                Have a question about faith, doctrine, or the church? Let us know below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Name <span className="text-red-400">*</span></label>
                                <input required className={inputCls} placeholder="John Doe" value={form.name} onChange={set("name")} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Email</label>
                                    <input type="email" className={inputCls} placeholder="john@example.com" value={form.email} onChange={set("email")} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1.5">Phone Number</label>
                                    <input type="tel" className={inputCls} placeholder="+234..." value={form.phone} onChange={set("phone")} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Category <span className="text-red-400">*</span></label>
                                <div className="relative">
                                    <select
                                        className={`${inputCls} appearance-none bg-white`}
                                        value={form.category}
                                        onChange={set("category")}
                                    >
                                        <option value="Baptism">Baptism</option>
                                        <option value="Speaking in Tongues">Speaking in Tongues</option>
                                        <option value="Marriage">Marriage</option>
                                        <option value="Doctrine">Doctrine</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Your Question <span className="text-red-400">*</span></label>
                                <textarea
                                    required
                                    className={`${inputCls} resize-none`}
                                    rows={4}
                                    placeholder="Type your deep thoughts or questions here..."
                                    value={form.question}
                                    onChange={set("question")}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full mt-4 bg-light text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2"
                            >
                                {status === "submitting" ? (
                                    <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Submitting...</>
                                ) : "Submit Question"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AskQuestionModal;
