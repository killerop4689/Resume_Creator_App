package com.resumecreator.resume.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.resumecreator.resume.client.LLMClient;

/**
 * FormattingAgent - Formats resume for professional presentation
 * 
 * LOGIC:
 * - Takes raw resume content from ContentAgent
 * - Transforms it into ATS-friendly format (Applicant Tracking System)
 * - Ensures proper structure, bullet points, and readability
 */
@Component
public class FormattingAgent {

    @Autowired
    private LLMClient llmClient;

    public String formatResume(String resumeContent) {
        // Build prompt to format the resume
        String prompt = 
            "You are a professional resume formatter and recruiter.\n" +
            "Take the following resume content and format it perfectly:\n\n" +
            resumeContent + "\n\n" +
            "Instructions:\n" +
            "- Organize into clear sections: SUMMARY, SKILLS, EXPERIENCE, EDUCATION\n" +
            "- Use bullet points for achievements\n" +
            "- Ensure ATS-friendly formatting (no special characters, clean layout)\n" +
            "- Keep it concise and impactful\n" +
            "- Return as valid JSON with sections and content\n" +
            "- No explanations, only the formatted resume.";

        // Call the LLM to format
        return llmClient.callLLM(prompt);
    }
}

