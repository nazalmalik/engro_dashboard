import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-white border-t border-gray-100 mt-14 relative overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 right-0 w-72 h-72 bg-red-600/5 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 left-0 w-72 h-72 bg-red-500/5 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        {/* Left */}
        <p className="text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-800">
            Chill<span className="text-red-600">Cola</span>
          </span>{" "}
          Admin Dashboard. All rights reserved.
        </p>

        {/* Right Links */}
        <div className="flex gap-6 text-gray-500 font-medium">
          <span className="cursor-pointer hover:text-red-600 transition">
            Privacy
          </span>
          <span className="cursor-pointer hover:text-red-600 transition">
            Terms
          </span>
          <span className="cursor-pointer hover:text-red-600 transition">
            Support
          </span>
        </div>

      </div>
    </div>
  );
};

export default Footer;