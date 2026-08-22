package com.resumecreator.resume.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.resumecreator.resume.client.LLMClient;

@Component
public class InterviewQuestionAgent {

    @Autowired
    private LLMClient llmClient;

    public String generateQuestions(String finalResume) {
        String prompt = """
            You are a technical hiring manager and interview coach.
            Based on the resume provided below, generate exactly 15 relevant interview questions.
            Ensure a balanced mix of technical deep-dives and behavioral questions directly tied to the specific tools, roles, and projects mentioned.

            RESUME CONTENT:
            %s

            CRITICAL OUTPUT CONSTRAINTS:
            - Output MUST be strictly a raw, valid JSON array of strings (e.g., ["Question 1?", "Question 2?"]).
            - DO NOT wrap the output in markdown code blocks (e.g., NO ```json or ```).
            - DO NOT include conversational filler, intro text, numbering outside the JSON strings, or explanations.
            """.formatted(finalResume);

        return llmClient.callLLM(prompt);
    }
}
