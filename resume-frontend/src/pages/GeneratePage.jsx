import { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumeDisplay from "../components/ResumeDisplay";
import { generateResume } from "../api/ResumeApi";

function GeneratePage() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function handleGenerate(payload) {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const result = await generateResume(payload);
      setResponse(result);
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
    {response && <ResumeDisplay response={response} />}
  </div>
);
}

export default GeneratePage;