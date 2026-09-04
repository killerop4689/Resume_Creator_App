import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeContent from "../components/ResumeContent";
import InterviewQuestions from "../components/InterviewQuestions";
import { getResumeById } from "../api/ResumeApi";

function HistoryDetail() {
  const { id } = useParams();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchRecord() {
      try {
        const record = await getResumeById(id);
        const parsedResponse = JSON.parse(record.responseJson);
        setResponse(parsedResponse);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecord();
  }, [id]);

  if (isLoading) return <p>Loading resume...</p>;
  if (errorMsg) return <p className="error">{errorMsg}</p>;
  if (!response) return null;
  if (response.error) return <div className="error">Error: {response.error}</div>;

  const { resume, interviewQuestions } = response;

  return (
    <div className="app-container">
      <ResumeContent resume={resume} />
      <InterviewQuestions questions={interviewQuestions} />
    </div>
  );
}

export default HistoryDetail;