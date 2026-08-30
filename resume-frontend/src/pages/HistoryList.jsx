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

  if (isLoading) return <div className="card text-center">Loading history...</div>;
  if (errorMsg) return <div className="error">{errorMsg}</div>;

  return (
    <div className="card history-card animate-fade-in">
      <h2 className="history-title">Resume History</h2>

      {records.length === 0 ? (
        <p className="text-center">No resumes generated yet.</p>
      ) : (
        <ul className="history-list">
          {records.map((record, index) => (
            <li 
              key={record.id} 
              className="history-item animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }} // Staggered list animation
            >
              <Link to={`/history/${record.id}`} className="history-link">
                <span className="history-name">{record.userName || "Untitled Resume"}</span>
                
                {/* Separated Metadata Container */}
                <div className="history-meta">
                  <span className="history-badge">Score: {record.overallScore ?? "N/A"}</span>
                  <span className="history-date">
                    {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : ""}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryList;