import React, { useState } from "react";

function ResumeDisplay({ response }) {
  const [copied, setCopied] = useState(false);

  if (!response) return null;
  if (response.error) {
    return <div className="error">Error: {response.error}</div>;
  }

  const { resume, interviewQuestions } = response;
  if (!resume) return <div className="error">No resume data found.</div>;

  // Copy whole resume text to clipboard
  const handleCopyText = () => {
    const textContent = `
${resume.contact_information?.name}
${resume.contact_information?.email} | ${resume.contact_information?.phone}

SUMMARY
${resume.summary}

SKILLS
${resume.skills?.join(", ")}

EXPERIENCE
${resume.experience?.map(e => `${e.role} - ${e.company} (${e.period})\n${e.bullet_points?.map(b => `• ${b}`).join("\n")}`).join("\n\n")}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resume-display card animate-fade-in">
      {/* Top Action Bar: Only Copy Plain Text Button */}
      <div className="action-bar">
        <button 
          onClick={handleCopyText} 
          className={`btn-secondary ${copied ? "btn-copied" : ""}`}
        >
          {copied ? "✅ Copied to Clipboard!" : "📋 Copy Plain Text"}
        </button>
      </div>

      {/* Header Section */}
      <header className="resume-header">
        <h1>{resume.contact_information?.name}</h1>
        <p className="contact-info">
          <span>{resume.contact_information?.email}</span>
          {resume.contact_information?.phone && <span> • {resume.contact_information.phone}</span>}
        </p>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="resume-section summary-section">
          <h2>Summary</h2>
          <p>{resume.summary}</p>
        </section>
      )}

      {/* Skills Pills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="resume-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {resume.skills.map((skill, index) => (
              <span key={index} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <section className="resume-section">
          <h2>Experience</h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="experience-item">
              <div className="item-header">
                <strong>{exp.role}</strong> — <span className="company">{exp.company}</span>
                {exp.period && <span className="period"> ({exp.period})</span>}
              </div>
              {exp.bullet_points && (
                <ul>
                  {exp.bullet_points.map((bp, j) => (
                    <li key={j}>{bp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="resume-section">
          <h2>Projects</h2>
          {resume.projects.map((proj, i) => (
            <div key={i} className="project-item">
              <div className="item-header">
                <strong>{proj.title}</strong>
                {proj.technologies && proj.technologies.length > 0 && (
                  <span className="tech-stack"> — {proj.technologies.join(", ")}</span>
                )}
              </div>
              {proj.bullet_points && (
                <ul>
                  {proj.bullet_points.map((bp, j) => (
                    <li key={j}>{bp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          <ul>
            {resume.education.map((edu, i) => (
              <li key={i}>{edu}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Interview Questions */}
      {interviewQuestions && interviewQuestions.length > 0 && (
        <section className="resume-section interview-section animate-slide-up">
          <h2>Likely Interview Questions</h2>
          <ol>
            {interviewQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

export default ResumeDisplay;