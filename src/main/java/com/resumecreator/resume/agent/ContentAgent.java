package com.resumecreator.resume.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.resumecreator.resume.client.LLMClient;
import com.resumecreator.resume.model.ResumeRequest;

/**
 * ContentAgent - Generates resume content using Spring AI
 * 
 * LOGIC:
 * - Takes user input (name, email, phone, skills)
 * - Builds a prompt asking the LLM to generate resume content
 * - Returns raw content for next agent
 */
@Component
public class ContentAgent {

    @Autowired
    private LLMClient llmClient;

    public String generateContent(ResumeRequest request) {
        // Build the prompt - this is what we send to the AI model
        String prompt = 
            "You are a senior software engineer resume expert.\n" +
            "Create a professional resume using the following details:\n\n" +
            "Name: " + request.getName() + "\n" +
            "Email: " + request.getEmail() + "\n" +
            "Phone: " + request.getPhone() + "\n" +
            "Skills: " + String.join(", ", request.getSkills()) + "\n\n" +
            "Generate compelling resume content that highlights achievements and experience.\n" +
            "Format as JSON with sections: summary, skills, experience, education.\n" +
            "Return ONLY valid JSON, no explanations.";

        // Call the LLM through Spring AI
        return llmClient.callLLM(prompt);
    }
}

