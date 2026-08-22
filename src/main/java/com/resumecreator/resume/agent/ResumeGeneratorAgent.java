package com.resumecreator.resume.agent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.resumecreator.resume.client.LLMClient;
import com.resumecreator.resume.model.ResumeRequest;

@Component
public class ResumeGeneratorAgent {

    @Autowired
    private LLMClient llmClient;

    public String generateResume(ResumeRequest request) {
        String prompt = """
            You are a senior software engineer resume expert and professional formatter.
            Create and format a professional resume based ONLY on the details provided below.

            GROUND TRUTH USER DATA:
            - Name: %s
            - Email: %s
            - Phone: %s
            - Skills: %s
            - Experience:
            - %s
            - Projects:
            - %s
            - Education:
            - %s

            INSTRUCTIONS:
            1. Transform each experience and project entry into 2-3 strong, impact-driven bullet points using strong action verbs.
            2. Strict Factuality: Use ONLY the facts provided above — DO NOT invent companies, dates, technologies, or false quantitative metrics.
            3. For each project entry, extract every specific technology, language, framework, or tool
               mentioned in that project's description and list them in its "technologies" array.
               For example, if a project description says "React + Node, deployed on AWS", the
               technologies array MUST be ["React", "Node", "AWS"]. If truly no technology is
               mentioned for a project, return an empty array rather than guessing.
            4. Structure: Organize content into sections: summary, skills, experience, projects.
            5. MANDATORY: The "contact_information" object MUST include name, email, and phone
               EXACTLY as given above, copied verbatim. Never omit or blank these out even if
               other fields are being rewritten.
            6. LENGTH TARGET: The full resume content (all bullet points and summary text combined)
               MUST total between 150 and 700 words, aiming for approximately 450 words. Expand on
               each experience/project entry with enough detail (additional bullet points, more
               specific descriptions) to comfortably reach this range — do not pad with filler,
               but do not leave sections thin either.
            7. For education, format each entry as a clean single-line string (e.g., "B.Tech in
               Computer Science, XYZ University, 2018-2022"). Do not invent degrees, institutions,
               or years not present in the input. If no education was provided, return an empty array.


            REQUIRED JSON SCHEMA (every field below must be present and populated where data exists):
            {
              "contact_information": { "name": "", "email": "", "phone": "" },
              "summary": "",
              "skills": ["string"],
              "experience": [
                { "role": "", "company": "", "period": "", "bullet_points": ["string"] }
              ],
              "projects": [
                { "title": "", "technologies": ["string"], "bullet_points": ["string"] }
              ],
              "education": ["string"]
            }

            CRITICAL OUTPUT CONSTRAINTS:
            - Output MUST be strictly raw, valid JSON containing the structured resume sections.
            - DO NOT wrap the output in markdown code blocks (e.g., NO ```json or ```).
            - DO NOT include conversational text, intro notes, or explanations outside the JSON payload.
            """.formatted(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                String.join(", ", request.getSkills()),
                String.join("\n- ", request.getExperience()),
                String.join("\n- ", request.getProjects()),
                String.join("\n- ", request.getEducation())
            );

        return llmClient.callLLM(prompt);
    }
}