import { User, Mail, Shield, Smartphone, Camera, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getAuthToken = () => localStorage.getItem("token") || "";

export function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: "",
    fullName: "",
    email: "",
    role: "",
    phone: "",
    avatarUrl: "",
    employeeId: "",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "",
    avatarUrl: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError("");
    try {
      const token = getAuthToken();
      if (!token) {
        navigate('/login');
        return;
      }
      
      const res = await axios.get("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setProfile({ ...res.data.data, avatarUrl: res.data.data.avatarUrl || "" });
        setFormData({
          fullName: res.data.data.fullName || "",
          phone: res.data.data.phone || "",
          email: res.data.data.email || "",
          role: res.data.data.role || "",
          avatarUrl: res.data.data.avatarUrl || "",
        });
      }
    } catch (err: any) {
      console.error("Fetch profile failed", err);
      setError("Failed to load user profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = getAuthToken();
      const res = await axios.put("http://localhost:8080/api/users/me", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setSuccess("Profile updated successfully!");
        setProfile({ ...res.data.data, avatarUrl: res.data.data.avatarUrl || "" });
      }
    } catch (err: any) {
      console.error("Save profile failed", err);
      setError(err.response?.data?.message || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    setFormData({
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      email: profile.email || "",
      role: profile.role || "",
      avatarUrl: profile.avatarUrl || "",
    });
    setSuccess("");
    setError("");
  };

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker and upload to S3/Cloudinary.
    // For this hackathon version, we'll use a prompt to set an image URL directly for simplicity.
    const url = prompt("Enter an image URL for your avatar:", formData.avatarUrl);
    if (url !== null) {
      setFormData(prev => ({ ...prev, avatarUrl: url }));
    }
  };

  const initials = profile.fullName
    ? profile.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "U";

  // Display value for role dropdown
  const formattedRole = profile.role === 'admin' ? 'System Administrator' : profile.role === 'manager' ? 'Inventory Manager' : 'Staff Member';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full max-w-[1200px]">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">User Profile</h1>
        <p className="text-text-secondary">Manage your personal information and security settings.</p>
      </div>

      <div className="bg-card-background rounded-2xl shadow-sm border border-borders overflow-hidden">
        {/* Header section */}
        <div className="p-8 border-b border-borders bg-gradient-to-r from-primary/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
            {formData.avatarUrl ? (
              <img src={formData.avatarUrl} alt="Avatar" className="h-28 w-28 rounded-full border-4 border-white shadow-sm object-cover" />
            ) : (
              <div className="h-28 w-28 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-4xl border-4 border-white shadow-sm overflow-hidden">
                {initials}
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white h-8 w-8 mb-1" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-text-primary">{profile.fullName || "User Name"}</h2>
            <p className="text-text-secondary flex items-center gap-2 mt-2 text-[15px]">
              <Shield size={18} className="text-primary" />
              {formattedRole}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
             <button onClick={handleAvatarChange} className="px-5 py-2.5 border border-borders rounded-lg text-sm font-medium hover:bg-white transition-colors shadow-sm bg-background flex items-center gap-2">
               <Camera size={16} /> Change Avatar
             </button>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {error && <div className="p-4 bg-critical/10 text-critical text-sm rounded-lg border border-critical/20">{error}</div>}
          {success && <div className="p-4 bg-success/10 text-success-700 text-sm rounded-lg border border-success/20">{success}</div>}

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full h-12 px-4 bg-white border border-borders rounded-lg text-[15px] focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Company Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full h-12 px-4 bg-white border border-borders rounded-lg text-[15px] focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all"
                >
                  <option value="admin">System Administrator</option>
                  <option value="manager">Inventory Manager</option>
                  <option value="staff">Staff Member</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-borders w-full" />

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
              <Mail size={20} className="text-primary" />
              Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 bg-white border border-borders rounded-lg text-[15px] focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                  <Smartphone size={16} className="text-text-secondary" />
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-12 px-4 bg-white border border-borders rounded-lg text-[15px] focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-borders bg-background/50 flex justify-end gap-4">
          <button 
            onClick={handleDiscard}
            disabled={isSaving}
            className="px-6 py-2.5 border border-borders rounded-lg font-medium hover:bg-background transition-colors shadow-sm bg-white disabled:opacity-50"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg font-medium transition-all active:scale-[0.98] shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving && <Loader2 size={16} className="animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
