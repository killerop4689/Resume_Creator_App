import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

function ResumeContent({ resume }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResume, setEditedResume] = useState(resume);
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  // Keep the local edit copy in sync whenever a *new* resume is passed in
  // (e.g. user generates a fresh one, or navigates to a different history entry)
  useEffect(() => {
    setEditedResume(resume);
  }, [resume]);

  if (!resume) return <div className="error">No resume data found.</div>;

  const data = isEditing ? editedResume : resume;

  // ---- field setters ----
  function updateContact(field, value) {
    setEditedResume(prev => ({
      ...prev,
      contact_information: { ...prev.contact_information, [field]: value }
    }));
  }

  function updateSummary(value) {
    setEditedResume(prev => ({ ...prev, summary: value }));
  }

  function updateSkills(value) {
    setEditedResume(prev => ({
      ...prev,
      skills: value.split(",").map(s => s.trim()).filter(Boolean)
    }));
  }

  function updateExperienceField(index, field, value) {
    setEditedResume(prev => {
      const experience = [...prev.experience];
      experience[index] = { ...experience[index], [field]: value };
      return { ...prev, experience };
    });
  }

  function updateExperienceBullets(index, value) {
    updateExperienceField(index, "bullet_points", value.split("\n"));
  }

  function updateProjectField(index, field, value) {
    setEditedResume(prev => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  }

  function updateProjectTechnologies(index, value) {
    updateProjectField(index, "technologies", value.split(",").map(s => s.trim()).filter(Boolean));
  }

  function updateProjectBullets(index, value) {
    updateProjectField(index, "bullet_points", value.split("\n"));
  }

  function updateEducation(value) {
    setEditedResume(prev => ({ ...prev, education: value.split("\n").filter(Boolean) }));
  }

  // ---- actions ----
  function handleCopyText() {
    const textContent = `
${data.contact_information?.name}
${data.contact_information?.email} | ${data.contact_information?.phone}

SUMMARY
${data.summary}

SKILLS
${data.skills?.join(", ")}

EXPERIENCE
${data.experience?.map(e => `${e.role} - ${e.company} (${e.period})\n${e.bullet_points?.map(b => `• ${b}`).join("\n")}`).join("\n\n")}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleExportPdf() {
    if (!printRef.current) return;
    const wasEditing = isEditing;
    if (wasEditing) setIsEditing(false); // export the clean rendered view, not <input> boxes

    setTimeout(() => {
      const opt = {
        margin: 0.4,
        filename: `${(data.contact_information?.name || "resume").replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: "#ffffff" },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      };
      html2pdf().set(opt).from(printRef.current).save().then(() => {
        if (wasEditing) setIsEditing(true);
      });
    }, 50);
  }

  return (
    <div className="resume-content-wrapper card animate-fade-in">
      <div className="action-bar">
        <button onClick={handleCopyText} className={`btn-secondary ${copied ? "btn-copied" : ""}`}>
          {copied ? "✅ Copied to Clipboard!" : "📋 Copy Plain Text"}
        </button>
        <button onClick={() => setIsEditing(prev => !prev)} className="btn-secondary">
          {isEditing ? "👁 Preview" : "✏️ Edit"}
        </button>
        <button onClick={handleExportPdf} className="btn-secondary">
          📄 Export as PDF
        </button>
      </div>

      <div ref={printRef} className="resume-display">
        <header className="resume-header">
          {isEditing ? (
            <>
              <input value={data.contact_information?.name || ""} onChange={e => updateContact("name", e.target.value)} placeholder="Full Name" />
              <input value={data.contact_information?.email || ""} onChange={e => updateContact("email", e.target.value)} placeholder="Email" />
              <input value={data.contact_information?.phone || ""} onChange={e => updateContact("phone", e.target.value)} placeholder="Phone" />
            </>
          ) : (
            <>
              <h1>{data.contact_information?.name}</h1>
              <p className="contact-info">
                <span>{data.contact_information?.email}</span>
                {data.contact_information?.phone && <span> • {data.contact_information.phone}</span>}
              </p>
            </>
          )}
        </header>

        <section className="resume-section summary-section">
          <h2>Summary</h2>
          {isEditing ? (
            <textarea value={data.summary || ""} onChange={e => updateSummary(e.target.value)} />
          ) : (
            <p>{data.summary}</p>
          )}
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          {isEditing ? (
            <input
              value={(data.skills || []).join(", ")}
              onChange={e => updateSkills(e.target.value)}
              placeholder="Skills (comma-separated)"
            />
          ) : (
            <div className="skills-grid">
              {(data.skills || []).map((skill, index) => (
                <span key={index} className="skill-pill">{skill}</span>
              ))}
            </div>
          )}
        </section>

        {(data.experience || []).length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="experience-item">
                {isEditing ? (
                  <>
                    <input value={exp.role || ""} onChange={e => updateExperienceField(i, "role", e.target.value)} placeholder="Role" />
                    <input value={exp.company || ""} onChange={e => updateExperienceField(i, "company", e.target.value)} placeholder="Company" />
                    <input value={exp.period || ""} onChange={e => updateExperienceField(i, "period", e.target.value)} placeholder="Period" />
                    <textarea
                      value={(exp.bullet_points || []).join("\n")}
                      onChange={e => updateExperienceBullets(i, e.target.value)}
                      placeholder="One bullet point per line"
                    />
                  </>
                ) : (
                  <>
                    <div className="item-header">
                      <strong>{exp.role}</strong> — <span className="company">{exp.company}</span>
                      {exp.period && <span className="period"> ({exp.period})</span>}
                    </div>
                    {exp.bullet_points && (
                      <ul>
                        {exp.bullet_points.map((bp, j) => <li key={j}>{bp}</li>)}
                      </ul>
                    )}
                  </>
                )}
              </div>
            ))}
          </section>
        )}

        {(data.projects || []).length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {data.projects.map((proj, i) => (
              <div key={i} className="project-item">
                {isEditing ? (
                  <>
                    <input value={proj.title || ""} onChange={e => updateProjectField(i, "title", e.target.value)} placeholder="Title" />
                    <input
                      value={(proj.technologies || []).join(", ")}
                      onChange={e => updateProjectTechnologies(i, e.target.value)}
                      placeholder="Technologies (comma-separated)"
                    />
                    <textarea
                      value={(proj.bullet_points || []).join("\n")}
                      onChange={e => updateProjectBullets(i, e.target.value)}
                      placeholder="One bullet point per line"
                    />
                  </>
                ) : (
                  <>
                    <div className="item-header">
                      <strong>{proj.title}</strong>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <span className="tech-stack"> — {proj.technologies.join(", ")}</span>
                      )}
                    </div>
                    {proj.bullet_points && (
                      <ul>
                        {proj.bullet_points.map((bp, j) => <li key={j}>{bp}</li>)}
                      </ul>
                    )}
                  </>
                )}
              </div>
            ))}
          </section>
        )}

        {(data.education || []).length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {isEditing ? (
              <textarea
                value={(data.education || []).join("\n")}
                onChange={e => updateEducation(e.target.value)}
                placeholder="One entry per line"
              />
            ) : (
              <ul>
                {data.education.map((edu, i) => <li key={i}>{edu}</li>)}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumeContent;