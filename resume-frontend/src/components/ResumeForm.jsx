import { useState } from "react";

function ResumeForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: [""],
    projects: [""],
    education: [""],
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Generic handlers reused across experience / projects / education
  function handleListChange(field, index, value) {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  }

  function addListItem(field) {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  }

  function removeListItem(field, index) {
    const updatedList = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedList });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      experience: formData.experience.map(s => s.trim()).filter(Boolean),
      projects: formData.projects.map(s => s.trim()).filter(Boolean),
      education: formData.education.map(s => s.trim()).filter(Boolean),
    };

    onSubmit(payload);
  }

  function renderListSection(field, label, placeholder) {
    return (
      <div className="list-section">
        <label className="list-label">{label}</label>
        {formData[field].map((value, index) => (
          <div key={index} className="list-row">
            <input
              value={value}
              placeholder={placeholder}
              onChange={(e) => handleListChange(field, index, e.target.value)}
            />
            {formData[field].length > 1 && (
              <button
                type="button"
                className="btn-secondary btn-remove"
                onClick={() => removeListItem(field, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn-secondary btn-add"
          onClick={() => addListItem(field)}
        >
          + Add {label}
        </button>
      </div>
    );
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

      {renderListSection("experience", "Experience", "e.g. Backend Engineer at TechCorp (2022-Present): led migration to microservices...")}
      {renderListSection("projects", "Projects", "e.g. Resume builder app: Java + Spring AI, multi-agent pipeline...")}
      {renderListSection("education", "Education", "e.g. B.Tech in CS, ABC Institute, 2018-2022")}

      <button type="submit" disabled={isLoading}>
        Generate Resume
      </button>
    </form>
  );
}

export default ResumeForm;