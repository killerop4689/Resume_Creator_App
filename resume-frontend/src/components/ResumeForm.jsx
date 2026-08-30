import { useState } from "react";

function ResumeForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      experience: formData.experience.split("\n").map(s => s.trim()).filter(Boolean),
      projects: formData.projects.split("\n").map(s => s.trim()).filter(Boolean),
      education: formData.education.split("\n").map(s => s.trim()).filter(Boolean),
    };

    onSubmit(payload);
  }

  const firstName = formData.name.trim().split(" ")[0] || "there";

  if (isLoading) {
    return (
      <div className="loading-container animate-fade-in">
        <div className="magic-spinner"></div>
        <h3>Hey {firstName}! ✨</h3>
        <p className="loading-subtext">
          We're crafting a polished, on-point resume for you... get ready to feel the magic! 🚀
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} />
      <textarea name="experience" placeholder="One experience entry per line" value={formData.experience} onChange={handleChange} rows={4} />
      <textarea name="projects" placeholder="One project entry per line" value={formData.projects} onChange={handleChange} rows={4} />
      <textarea name="education" placeholder="One education entry per line" value={formData.education} onChange={handleChange} rows={3} />
      <button type="submit" disabled={isLoading}>
        Generate Resume
      </button>
    </form>
  );
}

export default ResumeForm;