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
    <div>
      <h1>Resume Creator</h1>
      <ResumeForm onSubmit={handleGenerate} isLoading={isLoading} />
      {errorMsg && <div className="error">{errorMsg}</div>}
      {response && <ResumeDisplay response={response} />}
    </div>
  );
}

export default GeneratePage;