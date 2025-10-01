import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import ReportViewer from "./ReportView";
import LimitReachedPopup from "./LimitReachedPopup";

function ActionHub() {
  // const BaseUrl = "http://localhost:5000" //localhost
  const BaseUrl = "https://api.termreader.zenpix.shop";
  const [pastedText, setPastedText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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

    // Drag and drop handlers
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        
        setLoading(true);
        createWorker("eng").then(async (worker) => {
          const { data } = await worker.recognize(file);
          setPastedText(data.text);
          setLoading(false);
          await worker.terminate();
        });
      }
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);
    
    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleCreate = async () => {
    if (!pastedText.trim()) {
      alert("Please paste text or image first!");
      return;
    }

    try {
      setSending(true);
      const res = await fetch(`${BaseUrl}/api/create-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: pastedText }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data);
        return;
      }

      setReport(data.message);
    } catch (err) {
      console.error(err);
      setError({ info: "Something went wrong.", support: "Please try again later." });
    } finally {
      setSending(false);
    }
  };

  const clearContent = () => {
    setPastedText("");
    setImageUrl(null);
    setReport(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-2xl mb-4">
            <div className="text-2xl">📋</div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Terms & Conditions Analyzer
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Paste, upload, or record your terms & conditions for instant analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Image/Upload Area */}
          <div 
            className={`flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${
              isDragging 
                ? "border-blue-400 bg-blue-500/20 scale-105" 
                : imageUrl 
                  ? "border-green-400 bg-green-500/10" 
                  : "border-gray-500 bg-white/5 hover:bg-white/10 hover:border-gray-400"
            }`}
          >
            {imageUrl ? (
              <div className="relative w-full">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-xl shadow-lg"
                />
                <button
                  onClick={() => setImageUrl(null)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-6xl mb-2">📸</div>
                <p className="text-gray-300 text-lg font-medium">
                  Drag & Drop image here
                </p>
                <p className="text-gray-400 text-sm">
                  or paste with <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Ctrl+V</kbd>
                </p>
                <p className="text-blue-300 text-xs">
                  Supports PNG, JPG, GIF
                </p>
              </div>
            )}
            {loading && (
              <div className="mt-4 flex items-center gap-2 text-blue-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Extracting text from image...</span>
              </div>
            )}
          </div>

          {/* Right: Text Area */}
          <div className="flex flex-col gap-4">
            <div className="relative flex-1">
              <textarea
                className="w-full h-72 p-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                placeholder="Paste your terms & conditions text here... or type manually..."
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
              />
              {pastedText && (
                <button
                  onClick={clearContent}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                >
                  ✕ Clear
                </button>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl text-white font-medium transition-all transform hover:scale-105 active:scale-95"
                onClick={() => alert("Voice recording feature coming soon! 🎤")}
              >
                <span className="text-lg">🎤</span>
                Record Audio
              </button>
              
              <div className="flex-1 text-right">
                <div className="text-sm text-gray-400 mb-1">
                  {pastedText.length} characters
                </div>
                <div className="text-xs text-gray-500">
                  Minimum 50 characters recommended
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-10 h-6 bg-gray-600 rounded-full transition-colors"></div>
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
              Auto OCR Processing
            </label>
            
            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg">📷 Image</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg">📝 Text</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg">🎤 Audio</span>
            </div>
          </div>
          
          <button
            onClick={handleCreate}
            disabled={sending || !pastedText.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all transform hover:scale-105 disabled:scale-100 flex items-center gap-2 min-w-[160px] justify-center"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <span>🚀</span>
                Generate Report
              </>
            )}
          </button>
        </div>

        {/* Report Viewer */}
        <LimitReachedPopup error={error} />
      {console.log(`error -> ${error}`)}
        <ReportViewer report={report} loading={sending || loading} />
      </div>
    </section>
  );
}

export default ActionHub;