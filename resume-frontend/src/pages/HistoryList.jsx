import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getResumeHistory } from "../api/ResumeApi";

function HistoryList() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getResumeHistory();
        setRecords(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (isLoading) return <p>Loading history...</p>;
  if (errorMsg) return <p className="error">{errorMsg}</p>;

  return (
    <div>
      <h2>Resume History</h2>
      {records.length === 0 && <p>No resumes generated yet.</p>}
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <Link to={`/history/${record.id}`}>
              {record.userName} — Score: {record.overallScore} — {record.createdAt}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryList;