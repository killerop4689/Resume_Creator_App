package com.resumecreator.resume.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumecreator.resume.client.LLMClient;
import com.resumecreator.resume.model.QualityReviewResult;
import com.resumecreator.resume.model.ResumeRequest;

@Component
public class QualityReviewAgent {

    @Autowired
    private LLMClient llmClient;

    private final ObjectMapper mapper = new ObjectMapper();

    public QualityReviewResult review(String resumeContent, ResumeRequest userFacts) {
        String prompt = """
            You are an expert resume reviewer and strict auditor.

            GROUND TRUTH USER FACTS (Nothing outside this list is true):
            - Name: %s
            - Skills: %s
            - Experience: %s
            - Projects: %s
            - Education: %s

            GENERATED RESUME TO REVIEW:
            %s

            REVIEW INSTRUCTIONS:
            1. Check for unsupported claims: Compare the resume against the GROUND TRUTH. Identify any numbers, tools, or achievements in the resume NOT supported by the user facts. If none exist, return an empty array [].
            2. Evaluate bullet point strength: Identify bullet points lacking strong action verbs or measurable impact. If none, return an empty array [].
            3. Assign an overallScore from 0 to 100 based on factual accuracy, clarity, and impact.
            4. Make a decision: Set "decision" to "REVISE" if overallScore < 70 OR if any unsupported claims exist. Otherwise, set it to "FINISH".
            5. MANDATORY: The "contact_information" object MUST include name, email, and phone
               EXACTLY as given by the user, copied verbatim. Never omit or blank these out even if
               other fields are being rewritten.

            CRITICAL OUTPUT CONSTRAINTS:
            - Output MUST be strictly raw, valid JSON matching the exact schema below.
            - DO NOT wrap the output in markdown code blocks (e.g., NO ```json or ```).
            - DO NOT include any introductory, explanatory, or concluding text outside the JSON object.

            REQUIRED JSON SCHEMA:
            {
              "overallScore": 85,
              "decision": "REVISE",
              "unsupportedClaims": ["Claim 1"],
              "bulletIssues": ["Issue 1"],
              "improvements": ["Improvement 1"]
            }
            """.formatted(
                userFacts.getName(),
                String.join(", ", userFacts.getSkills()),
                String.join(" | ", userFacts.getExperience()),
                String.join(" | ", userFacts.getProjects()),
                String.join(" | ", userFacts.getEducation()),
                resumeContent
            );

        String raw = llmClient.callLLM(prompt);
        try {
            return mapper.readValue(raw, QualityReviewResult.class);
        } catch (Exception e) {
            QualityReviewResult fallback = new QualityReviewResult();
            fallback.setDecision("REVISE");
            fallback.setOverallScore(0);
            return fallback;
        }
    }
}