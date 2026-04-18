import React, { useState } from "react";
// Ensure your path to the asset is correct
import HeroImage from "../assets/HeroImage.PNG";
import EngroLogo from "../assets/favicon.jpg"; 

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const defaultUsername = "admin";
    const defaultPassword = "123456";

    if (form.username === defaultUsername && form.password === defaultPassword) {
      if (form.remember) {
        localStorage.setItem("user", JSON.stringify({ username: form.username }));
      }
      window.location.href = "/overviewpage";
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans antialiased overflow-hidden bg-white">
      
      {/* ================= LEFT SIDE (High Contrast Dark Effects) ================= */}
      <div className="hidden lg:flex lg:w-[60%] relative items-end justify-start overflow-hidden bg-black">
        
        {/* IMAGE LAYER */}
        <div className="absolute inset-0">
          <img 
            src={HeroImage} 
            alt="Engro Operations" 
            className="w-full h-full object-cover opacity-80" 
          />
          
          {/* GRADIENT OVERLAY 1: Deep Radial (Creates the "Focus" effect) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(0,0,0,0.8)_100%)]"></div>
          
          {/* GRADIENT OVERLAY 2: Linear Bottom-to-Top (Ensures text stands out) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          {/* BRAND TINT (Adds that deep corporate green mood) */}
          <div className="absolute inset-0 bg-[#006738]/20 mix-blend-multiply"></div>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 p-16 w-full">
          
          {/* Logo with Hexagon/Circle Container */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 shadow-2xl rounded-2xl bg-white p-3 flex items-center justify-center border-b-4 border-[#8DC63F]">
                <img 
                  src={EngroLogo} 
                  alt="Engro Logo" 
                  className="h-auto w-full object-contain" 
                />
              </div>
              <span className="text-4xl font-black text-white tracking-tighter">
                engro
              </span>
            </div>
          </div>

          {/* Slogan with Reference Image Styling */}
          <h1 className="text-6xl font-black text-white leading-[1.1] mb-4 drop-shadow-2xl">
            Your growth, <br />
            <span className="text-[#8DC63F] drop-shadow-none uppercase tracking-tight">our innovation</span>
          </h1>

          {/* Accent Line */}
          <div className="w-32 h-2 bg-[#8DC63F] rounded-full"></div>
        </div>

        {/* Subtle glow behind text for readability */}
        <div className="absolute bottom-0 left-0 w-[80%] h-[50%] bg-[#006738]/30 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* ================= RIGHT SIDE (Form remains clean & professional) ================= */}
      <div className="flex w-full lg:w-[40%] items-center justify-center bg-[#fcfcfc]">
        <div className="w-full max-w-md px-10">
          <form
            onSubmit={handleLogin}
            className="bg-white p-10 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-t-[6px] border-[#006738] relative"
          >
            <div className="absolute top-4 right-6 text-[10px] font-bold text-gray-300 tracking-[0.2em]">
              WMS v2.0
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#006738] tracking-tight">Admin Login</h2>
              <p className="text-gray-400 text-sm mt-1">Authorized Access Only</p>
            </div>

            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border-b border-gray-200 p-4 focus:outline-none focus:border-[#006738] transition-all bg-gray-50/30 hover:bg-gray-50"
                placeholder="e.g. admin_engro"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border-b border-gray-200 p-4 focus:outline-none focus:border-[#006738] transition-all bg-gray-50/30 hover:bg-gray-50"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-10">
              <label className="flex items-center text-sm text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="accent-[#006738] h-4 w-4 mr-2"
                />
                Keep me signed in
              </label>

              <button type="button" className="text-sm font-bold text-[#006738] hover:underline">
                Forgot?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#006738] hover:bg-[#004d2a] text-white py-4 rounded-sm font-bold shadow-xl shadow-green-900/20 transform active:scale-[0.99] transition-all tracking-[0.1em]"
            >
              SECURE LOGIN
            </button>

            <div className="mt-12 text-center">
              <p className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-medium">
                Encrypted Connection
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8DC63F]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#006738]"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#8DC63F]"></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;