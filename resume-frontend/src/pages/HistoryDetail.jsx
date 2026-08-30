import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeDisplay from "../components/ResumeDisplay";
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

  return <ResumeDisplay response={response} />;
}

export default HistoryDetail;