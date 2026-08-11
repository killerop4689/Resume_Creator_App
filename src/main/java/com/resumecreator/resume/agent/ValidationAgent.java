package com.resumecreator.resume.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.resumecreator.resume.client.LLMClient;

/**
 * ValidationAgent - Validates resume quality and completeness
 * 
 * LOGIC:
 * - Takes formatted resume from FormattingAgent
 * - Checks for quality, completeness, and professionalism
 * - Provides feedback and improvement suggestions
 * - Returns quality score and recommendations
 */
@Component
public class ValidationAgent {

    @Autowired
    private LLMClient llmClient;

    public String validateResume(String resumeContent) {
        // Build prompt to validate the resume
        String prompt = 
            "You are an expert resume reviewer and career coach.\n" +
            "Analyze the following resume and provide quality assessment:\n\n" +
            resumeContent + "\n\n" +
            "Evaluate on these criteria:\n" +
            "1. Completeness: All required sections present?\n" +
            "2. Grammar & Spelling: Any errors?\n" +
            "3. Professional Language: Appropriate tone?\n" +
            "4. ATS Compatibility: Scannable by systems?\n" +
            "5. Impact: Strong action verbs and achievements?\n\n" +
            "Return JSON with:\n" +
            "- overall_score (0-100)\n" +
            "- strengths (list)\n" +
            "- improvements (list)\n" +
            "- final_notes\n" +
            "Be constructive and specific.";

        // Call the LLM to validate
        return llmClient.callLLM(prompt);
    }
}

