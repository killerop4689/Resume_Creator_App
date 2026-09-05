import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


function ResumeContent({ resume }) {
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  if (!resume) return <div className="error">No resume data found.</div>;

  const data = resume;

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

PROJECTS
${data.projects?.map(p => `${p.title}${p.technologies?.length ? ` (${p.technologies.join(", ")})` : ""}\n${p.bullet_points?.map(b => `• ${b}`).join("\n")}`).join("\n\n")}

EDUCATION
${data.education?.join("\n")}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  

function handleExportPdf() {
  if (!printRef.current) return;

  html2canvas(printRef.current, {
    scale: 2,
    backgroundColor: "#ffffff",
    onclone: (clonedDoc) => {
      const el = clonedDoc.querySelector(".resume-display");
      if (!el) return;
      el.querySelectorAll("*").forEach(node => {
        node.style.setProperty("color", "#000000", "important");
        node.style.setProperty("-webkit-text-fill-color", "#000000", "important");
        node.style.setProperty("background", "none", "important");
        node.style.setProperty("background-image", "none", "important");
        node.style.setProperty("-webkit-background-clip", "unset", "important");
        node.style.setProperty("background-clip", "unset", "important");
      });
  }
  }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "in", format: "letter", orientation: "portrait" });
    const pageWidth = pdf.internal.pageSize.getWidth() - 0.8; // account for 0.4in margins
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0.4, 0.4, pageWidth, imgHeight);
    pdf.save(`${(printRef.current.querySelector("h1")?.textContent || "resume").replace(/\s+/g, "_")}.pdf`);
  });
}

  return (
    <div className="resume-content-wrapper card animate-fade-in">
      <div className="action-bar">
        <button onClick={handleCopyText} className={`btn-secondary ${copied ? "btn-copied" : ""}`}>
          {copied ? " Copied to Clipboard!" : " Copy Plain Text"}
        </button>
        <button onClick={handleExportPdf} className="btn-secondary">
           Export as PDF
        </button>
      </div>

      <div ref={printRef} className="resume-display">
        <header className="resume-header">
          <h1>{data.contact_information?.name}</h1>
          <p className="contact-info">
            <span>{data.contact_information?.email}</span>
            {data.contact_information?.phone && <span> • {data.contact_information.phone}</span>}
          </p>
        </header>

        <section className="resume-section summary-section">
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {(data.skills || []).map((skill, index) => (
              <span key={index} className="skill-pill">{skill}</span>
            ))}
          </div>
        </section>

        {(data.experience || []).length > 0 && (
          <section className="resume-section">
            <h2>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="experience-item">
                <div className="item-header">
                  <strong>{exp.role}</strong> — <span className="company">{exp.company}</span>
                  {exp.period && <span className="period"> ({exp.period})</span>}
                </div>
                {exp.bullet_points && (
                  <ul>
                    {exp.bullet_points.map((bp, j) => <li key={j}>{bp}</li>)}
                  </ul>
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
              </div>
            ))}
          </section>
        )}

        {(data.education || []).length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            <ul>
              {data.education.map((edu, i) => <li key={i}>{edu}</li>)}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default ResumeContent;