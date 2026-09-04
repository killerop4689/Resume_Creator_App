import React from "react";

function InterviewQuestions({ questions }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="interview-questions card animate-slide-up">
      <section className="resume-section interview-section">
        <h2>Likely Interview Questions</h2>
        <ol>
          {questions.map((q, i) => <li key={i}>{q}</li>)}
        </ol>
      </section>
    </div>
  );
}

export default InterviewQuestions;