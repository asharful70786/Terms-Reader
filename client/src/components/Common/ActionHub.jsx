import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import ReportViewer from "./ReportView";

function ActionHub() {
  const [pastedText, setPastedText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [report, setReport] = useState(null); // NEW state for response

  useEffect(() => {
    const handlePaste = async (event) => {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          const url = URL.createObjectURL(file);
          setImageUrl(url);

          setLoading(true);
          const worker = await createWorker("eng");
          const { data } = await worker.recognize(file);
          setPastedText(data.text);
          setLoading(false);
          await worker.terminate();
        }

        if (item.type === "text/plain") {
          item.getAsString((text) => {
            setPastedText(text);
            setImageUrl(null);
          });
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleCreate = async () => {
    if (!pastedText.trim()) {
      alert("Please paste text or image first!");
      return;
    }

    try {
      setSending(true);
      const res = await fetch("http://localhost:5000/api/create-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: pastedText }),
      });

      if (!res.ok) throw new Error("Failed to send data");

      const data = await res.json();
      setReport(data.result || JSON.stringify(data)); 
    } catch (err) {
      console.error(err);
      alert("❌ Error sending data");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1e1b4b] to-black flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-6xl bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">
          Upload / Paste Image or Text
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Image Area */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-4 bg-gray-800/50">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-72 rounded-lg shadow-lg"
              />
            ) : (
              <p className="text-gray-400 text-center">
                📷 Drag & Drop or Paste an Image (Ctrl+V)
              </p>
            )}
            {loading && (
              <p className="mt-3 text-blue-400 animate-pulse">
                ⏳ Extracting text...
              </p>
            )}
          </div>

          {/* Right: Text Area + Mic */}
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full h-72 p-4 rounded-xl bg-gray-800 text-white focus:outline-none resize-none"
              placeholder="Type or paste text here..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium w-max"
              onClick={() => alert("Mic recording not implemented yet 🎤")}
            >
              🎤 Record
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <label>
              <input type="checkbox" className="mr-2" /> Auto OCR
            </label>
          </div>
          <button
            onClick={handleCreate}
            disabled={sending}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold disabled:opacity-50"
          >
            {sending ? "🚀 Sending..." : "Generate Report"}
          </button>
        </div>

        {/* Show Report in another component */}
        <ReportViewer report={report} />
      </div>
    </section>
  );
}

export default ActionHub;
