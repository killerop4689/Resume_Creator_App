import { useLocation, useNavigate } from "react-router-dom";
import ResumeContent from "../components/ResumeContent";
import InterviewQuestions from "../components/InterviewQuestions";

function ResumeResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer fresh router state (just generated); fall back to sessionStorage
  // so a hard refresh on /result doesn't lose the data.
  let response = location.state;
  if (!response) {
    const cached = sessionStorage.getItem("latestResumeResult");
    response = cached ? JSON.parse(cached) : null;
  }

  if (!response) {
    return (
      <div className="app-container">
        <div className="card">
          <p>No resume to show yet.</p>
          <button onClick={() => navigate("/")}>Generate a Resume</button>
        </div>
      </div>
    );
  }

  if (response.error) {
    return (
      <div className="app-container">
        <div className="error">Error: {response.error}</div>
      </div>
    );
  }

  const { resume, interviewQuestions } = response;

  return (
    <div className="app-container">
      <ResumeContent resume={resume} />
      <InterviewQuestions questions={interviewQuestions} />
    </div>
  );
}

export default ResumeResultPage;