import React, { useState, useEffect } from "react";

function ReportViewer({ report, loading }) {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "🔍 Analyzing legal terminology and clauses...",
    "💡 Tip: Always check refund terms carefully",
    "🛡️ Looking for privacy and data protection clauses",
    "📊 Evaluating fairness score based on consumer rights",
    "⚖️ Checking for liability limitations and disclaimers",
    "🔄 Identifying auto-renewal and cancellation policies",
    "🍪 Scanning for tracking and data usage disclosures"
  ];

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 85) {
            return prev + Math.floor(Math.random() * 15);
          }
          return prev;
        });
      }, 500);

      const tipInterval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % tips.length);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearInterval(tipInterval);
      };
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (showLoader) {
    return (
      <section className="mt-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl animate-pulse">
                📄
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              Analyzing Terms & Conditions
            </h3>
            <p className="text-blue-300 text-sm font-medium">
              {tips[tipIndex]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Processing...</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!report) return null;

  const { props = [], cons = [], tags = [], score } = report;

  return (
    <section className="mt-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-xl">
          📊
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Analysis Report</h2>
          <p className="text-gray-400 text-sm">Comprehensive T&C breakdown</p>
        </div>
      </div>

      {/* Score Card */}
      {score !== undefined && (
        <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Fairness Score</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              score >= 70 ? "bg-green-500/20 text-green-300" :
              score >= 40 ? "bg-yellow-500/20 text-yellow-300" :
              "bg-red-500/20 text-red-300"
            }`}>
              {score >= 70 ? "Excellent" : score >= 40 ? "Moderate" : "Poor"}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${
                  score >= 70 ? "bg-gradient-to-r from-green-400 to-green-500" :
                  score >= 40 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                  "bg-gradient-to-r from-red-400 to-red-500"
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">User-friendly rating</span>
              <span className="text-white font-bold">{score}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pros */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-green-400 text-lg">✅</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Positive Aspects</h3>
          </div>
          
          <div className="space-y-3">
            {props.length > 0 ? (
              props.map((point, i) => (
                <div
                  key={i}
                  className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/15 transition-colors"
                >
                  <p className="text-green-200 text-sm leading-relaxed">{point}</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-gray-400 text-sm">No significant positive aspects identified</p>
              </div>
            )}
          </div>
        </div>

        {/* Cons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
              <span className="text-red-400 text-lg">❌</span>
            </div>
            <h3 className="text-lg font-semibold text-white">Areas of Concern</h3>
          </div>
          
          <div className="space-y-3">
            {cons.length > 0 ? (
              cons.map((point, i) => (
                <div
                  key={i}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/15 transition-colors"
                >
                  <p className="text-red-200 text-sm leading-relaxed">{point}</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-white/5 rounded-xl text-center">
                <p className="text-gray-400 text-sm">No major concerns identified</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🏷️</span>
            Key Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/30 hover:scale-105 transition-transform cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-blue-200 text-sm text-center">
          💡 This analysis is AI-generated and should be used as guidance only. 
          Consult legal professionals for important decisions.
        </p>
      </div>
    </section>
  );
}

export default ReportViewer;