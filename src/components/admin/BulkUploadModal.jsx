import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCloudArrowUp, faFileArrowDown, faSpinner, faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { CSV_TEMPLATE_HEADERS } from "../../data/adminDummyData";

const EXPECTED_HEADERS = CSV_TEMPLATE_HEADERS.split(",");

const BulkUploadModal = ({ onClose, onUploaded }) => {
    const fileRef = useRef();
    const [file, setFile] = useState(null);
    const [state, setState] = useState("idle"); // idle | parsing | success | error
    const [result, setResult] = useState(null);
    const [parseError, setParseError] = useState("");

    const downloadTemplate = () => {
        const blob = new Blob([CSV_TEMPLATE_HEADERS + "\n"], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = "member_template.csv"; a.click();
        URL.revokeObjectURL(url);
    };

    const handleFile = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        if (!f.name.endsWith(".csv")) { setParseError("Only .csv files are accepted."); return; }
        setParseError("");
        setFile(f);
        setState("idle");
    };

    const handleUpload = async () => {
        if (!file) return;
        setState("parsing");
        await new Promise((r) => setTimeout(r, 1200));

        const text = await file.text();
        const lines = text.trim().split("\n");
        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

        // Validate headers
        const missing = EXPECTED_HEADERS.filter((h) => !headers.includes(h));
        if (missing.length) {
            setParseError(`Missing columns: ${missing.join(", ")}`);
            setState("error");
            return;
        }

        const rows = lines.slice(1).filter((l) => l.trim());
        const added = [], failed = [];
        rows.forEach((row, i) => {
            const vals = row.split(",");
            if (vals.length < EXPECTED_HEADERS.length || !vals[0]?.trim()) {
                failed.push(`Row ${i + 2}: incomplete data`);
            } else {
                const member = {};
                headers.forEach((h, idx) => { member[h] = vals[idx]?.trim() || ""; });
                added.push(member);
            }
        });

        setResult({ added: added.length, failed });
        if (added.length) onUploaded(added);
        setState("success");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-primary text-xl font-bold">Bulk Upload Members</h2>
                    <button onClick={onClose}><FontAwesomeIcon icon={faXmark} className="text-gray-400 text-xl hover:text-gray-600" /></button>
                </div>

                {/* Template download */}
                <button onClick={downloadTemplate}
                    className="w-full flex items-center justify-center gap-2 border border-dashed border-light text-light font-semibold py-2.5 rounded-xl hover:bg-light/5 transition text-base mb-5">
                    <FontAwesomeIcon icon={faFileArrowDown} /> Download CSV Template
                </button>

                {/* Drop zone */}
                <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-light transition mb-4"
                >
                    <FontAwesomeIcon icon={faCloudArrowUp} className="text-4xl text-gray-300 mb-3" />
                    <p className="text-gray-600 font-semibold">{file ? file.name : "Click to select a .csv file"}</p>
                    {!file && <p className="text-gray-400 text-sm mt-1">Only .csv files are accepted</p>}
                    <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
                </div>

                {parseError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-semibold mb-4">
                        <FontAwesomeIcon icon={faTriangleExclamation} /> {parseError}
                    </div>
                )}

                {state === "success" && result && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4 flex flex-col gap-2">
                        <p className="flex items-center gap-2 text-green-600 font-semibold">
                            <FontAwesomeIcon icon={faCircleCheck} /> {result.added} member{result.added !== 1 ? "s" : ""} added successfully
                        </p>
                        {result.failed.length > 0 && (
                            <div>
                                <p className="text-orange-500 font-semibold text-sm">{result.failed.length} row(s) failed:</p>
                                <ul className="text-gray-400 text-xs ml-4 list-disc">{result.failed.map((f, i) => <li key={i}>{f}</li>)}</ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-semibold hover:border-gray-300 transition">
                        {state === "success" ? "Close" : "Cancel"}
                    </button>
                    {state !== "success" && (
                        <button onClick={handleUpload} disabled={!file || state === "parsing"}
                            className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-light transition flex items-center justify-center gap-2">
                            {state === "parsing" ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Processing…</> : "Upload"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BulkUploadModal;
