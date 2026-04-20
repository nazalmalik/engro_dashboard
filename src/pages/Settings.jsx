import React, { useState } from "react";
import { 
  User, 
  ShieldCheck, 
  Bell, 
  Moon, 
  Save, 
  Mail, 
  Phone, 
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@engro.com",
    phone: "+92 300 1234567",
    notifications: true,
    darkMode: false,
    twoFactor: true,
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("System preferences updated successfully.");
    }, 1000);
  };

  const SectionHeader = ({ icon: Icon, title, sub }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-[#007A3D]/10 rounded-xl text-[#007A3D]">
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-[#0D1F16] tracking-tight">{title}</h3>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{sub}</p>
      </div>
    </div>
  );

  const InputField = ({ label, icon: Icon, ...props }) => (
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase text-gray-400 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#007A3D] transition-colors">
          <Icon size={16} />
        </div>
        <input 
          {...props}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:bg-white focus:border-[#007A3D] focus:ring-4 focus:ring-[#007A3D]/5 transition-all outline-none" 
        />
      </div>
    </div>
  );

  const Toggle = ({ name, checked, onChange, label, sub }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-[#007A3D]/20 transition-all">
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-[11px] text-gray-400 font-medium">{sub}</p>
      </div>
      <button
        onClick={() => onChange({ target: { name, type: 'checkbox', checked: !checked } })}
        className={`w-12 h-6.5 rounded-full transition-all duration-300 relative ${
          checked ? "bg-[#007A3D]" : "bg-gray-200"
        }`}
      >
        <div className={`absolute top-1 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-all duration-300 ${
          checked ? "left-6.5" : "left-1"
        }`} />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* 1. Profile Section */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader icon={User} title="Account Identity" sub="Personal & Contact Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Full Name" icon={User} name="name" value={form.name} onChange={handleChange} />
          <InputField label="Email Address" icon={Mail} name="email" type="email" value={form.email} onChange={handleChange} />
          <InputField label="Phone Number" icon={Phone} name="phone" value={form.phone} onChange={handleChange} />
        </div>
      </div>

      {/* 2. Security Section */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 delay-75 duration-500">
        <SectionHeader icon={ShieldCheck} title="Access & Security" sub="Authentication Management" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InputField label="Current Password" icon={Lock} name="currentPassword" type="password" placeholder="••••••••" onChange={handleChange} />
          <InputField label="New Password" icon={ShieldCheck} name="newPassword" type="password" placeholder="Enter new password" onChange={handleChange} />
        </div>
        <Toggle 
          name="twoFactor" 
          checked={form.twoFactor} 
          onChange={handleChange} 
          label="Two-Factor Authentication (2FA)" 
          sub="Requires a code from your mobile device to log in."
        />
      </div>

      {/* 3. Preferences Section */}
      <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 delay-150 duration-500">
        <SectionHeader icon={Bell} title="Interface Preferences" sub="Visuals & Notification Controls" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Toggle 
            name="notifications" 
            checked={form.notifications} 
            onChange={handleChange} 
            label="Critical Alerts" 
            sub="Push notifications for hardware trips." 
          />
          <Toggle 
            name="darkMode" 
            checked={form.darkMode} 
            onChange={handleChange} 
            label="Dark Appearance" 
            sub="Optimize contrast for low-light environments." 
          />
        </div>
      </div>

    </div>
  );
};

export default Settings;