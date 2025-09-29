import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1a0033] via-[#2b0055] to-[#1a0033] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            TermsReader
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Unlock legal document understanding in minutes with AI-powered
            analysis, summarization, and insights.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-pink-400">Home</a></li>
            <li><a href="/docs" className="hover:text-pink-400">Docs</a></li>
            <li><a href="/contact" className="hover:text-pink-400">Contact</a></li>
            <li><a href="/pricing" className="hover:text-pink-400">Pricing</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-pink-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-pink-400">Terms of Service</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold text-white mb-3">Connect</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-pink-400"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-400"><FaTwitter /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-400"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 py-4 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} TermsReader. All rights reserved. | 
          Nurtured by{" "}
          <a
            href="https://viralgut.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:underline"
          >
            viralgut.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
