import React from "react";

function ReportViewer({ report }) {
  if (!report) return null; // don’t render until data exists

  return (
    <section className="mt-6 bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4">📄 Generated Report</h2>
      <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
        {report}
      </div>
    </section>
  );
}

export default ReportViewer;
