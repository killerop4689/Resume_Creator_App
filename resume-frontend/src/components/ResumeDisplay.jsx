function ResumeDisplay({ response }) {
  if (response.error) {
    return <div className="error">Error: {response.error}</div>;
  }

  const { resume, interviewQuestions } = response;

  return (
    <div className="resume-display">
      <h2>{resume.contact_information.name}</h2>
      <p>{resume.contact_information.email} | {resume.contact_information.phone}</p>

      <h3>Summary</h3>
      <p>{resume.summary}</p>

      <h3>Skills</h3>
      <p>{resume.skills.join(", ")}</p>

      <h3>Experience</h3>
      {resume.experience.map((exp, i) => (
        <div key={i}>
          <strong>{exp.role} — {exp.company}</strong> ({exp.period})
          <ul>
            {exp.bullet_points.map((bp, j) => <li key={j}>{bp}</li>)}
          </ul>
        </div>
      ))}

      <h3>Projects</h3>
      {resume.projects.map((proj, i) => (
        <div key={i}>
          <strong>{proj.title}</strong> — {proj.technologies.join(", ")}
          <ul>
            {proj.bullet_points.map((bp, j) => <li key={j}>{bp}</li>)}
          </ul>
        </div>
      ))}

      <h3>Education</h3>
      <ul>
        {resume.education.map((edu, i) => <li key={i}>{edu}</li>)}
      </ul>

      <h3>Likely Interview Questions</h3>
      <ol>
        {interviewQuestions.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
    </div>
  );
}

export default ResumeDisplay;