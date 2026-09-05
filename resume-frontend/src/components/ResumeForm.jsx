import { useEffect, useState } from "react";

const loadingMessages = [
  "Scanning your experience for hidden strengths… ",
  "Turning everyday work into impressive achievements… ",
  "Giving your career story a serious upgrade… ",
  "Replacing ordinary phrases with powerful ones… ",
  "Making your skills impossible to overlook… ",
  "Polishing your professional story until it shines… ",
  "Teaching your resume to speak fluent success… ",
  "Adding the right words in all the right places… ",
  "Building a resume that gets past the first glance… ",
  "Almost there — your career glow-up is loading… ",
];

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

  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLoadingMessageIndex((currentIndex) =>
        (currentIndex + 1) % loadingMessages.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [isLoading]);

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
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      experience: formData.experience.map((s) => s.trim()).filter(Boolean),
      projects: formData.projects.map((s) => s.trim()).filter(Boolean),
      education: formData.education.map((s) => s.trim()).filter(Boolean),
    };

    onSubmit(payload);
  }

  function renderListSection(field, label, placeholder) {
    return (
      <div className="list-section">
        <label className="list-label">{label}</label>

        {formData[field].map((value, index) => (
          <div key={index} className="list-row">
            <textarea
              value={value}
              placeholder={placeholder}
              onChange={(e) =>
                handleListChange(field, index, e.target.value)
              }
              rows={2}
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

        <h3>Hey {firstName}! </h3>

        <p className="loading-subtext" aria-live="polite">
          {loadingMessages[loadingMessageIndex]}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <input
        name="skills"
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={handleChange}
      />

      {renderListSection(
        "experience",
        "Experience",
        "e.g. Backend Engineer at TechCorp (2022-Present): led migration to microservices..."
      )}

      {renderListSection(
        "projects",
        "Projects",
        "e.g. Resume builder app: Java + Spring AI, multi-agent pipeline..."
      )}

      {renderListSection(
        "education",
        "Education",
        "e.g. B.Tech in CS, ABC Institute, 2018-2022"
      )}

      <button type="submit" disabled={isLoading}>
        Generate Resume
      </button>
    </form>
  );
}

export default ResumeForm;