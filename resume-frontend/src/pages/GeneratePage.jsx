import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../components/ResumeForm";
import { generateResume } from "../api/ResumeApi";

function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  async function handleGenerate(payload) {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await generateResume(payload);

      if (result.error) {
        setErrorMsg(result.error);
        return;
      }

      // Stash the freshly generated result so /result survives a hard refresh
      // (router state alone is lost on reload).
      sessionStorage.setItem("latestResumeResult", JSON.stringify(result));
      navigate("/result", { state: result });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="form-title">Resume Creator</h1>
        <ResumeForm onSubmit={handleGenerate} isLoading={isLoading} />
      </div>

      {errorMsg && <div className="error">{errorMsg}</div>}
    </div>
  );
}

export default GeneratePage;