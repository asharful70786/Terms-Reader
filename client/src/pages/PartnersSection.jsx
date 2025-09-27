import React from "react";

function ClientsSection() {
  return (
    <section className="bg-gradient-to-b from-[#1e1b4b] via-[#0a0a0f] to-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top HR line */}
        <hr className="border-t border-neutral-800" />

        {/* News Banner */}
        <div className="flex items-center space-x-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full font-semibold tracking-wide shadow-sm">
            News
          </span>
          <p className="text-gray-300 font-[Poppins] text-base hover:text-white transition-colors cursor-pointer">
            Introducing Value Modeling —{" "}
            <span className="text-white font-semibold">
              A Control Panel for Your Business Objectives
            </span>{" "}
            →
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10 items-center">
          {[
            "AfterHour",
            "breakr",
            "checkmate",
            "DEV",
            "fetch",
            "hang",
            "kogan",
            "Locker",
            "Outdoorsy",
            "Playbook",
            "QVC",
            "Trela",
          ].map((logo, idx) => (
            <span
              key={idx}
              className="text-center text-gray-500 hover:text-purple-400 hover:scale-105 transition-all duration-300 font-semibold tracking-wide"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientsSection;
