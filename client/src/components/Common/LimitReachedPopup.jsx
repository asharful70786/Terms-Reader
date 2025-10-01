import React from "react";

function LimitReachedPopup({ error }) {
  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 max-w-md w-full space-y-6 animate-scaleIn">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl mx-auto">
            ⚠️
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Limit Reached
          </h2>
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <p className="text-gray-300 leading-relaxed">
            {error.info || "You've used all your free analyses for today."}
          </p>
          
          <p className="text-sm text-gray-400 leading-relaxed">
            {error.support || "Help us maintain this service by contributing to hosting and API costs."}
          </p>

          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <p className="text-orange-300 text-sm">
              🎁 Premium features available with donation
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all hover:scale-105 active:scale-95"
          >
            🔄 Try Again Later
          </button>
          <button
            onClick={() => window.open("https://razorpay.me/@mdashrafulmomin", "_blank")}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            💖 Support Us
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 pt-4 border-t border-white/10">
          Thank you for using our service! 🙏
        </p>
      </div>
    </div>
  );
}

export default LimitReachedPopup;