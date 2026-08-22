package com.resumecreator.resume.validator;

import org.springframework.stereotype.Component;

@Component
public class ResumeLengthValidator {

    private static final int MIN_WORDS = 150;
    private static final int MAX_WORDS = 700;

    public boolean isValid(String resumeContent) {
        int wordCount = resumeContent.trim().split("\\s+").length;
        return wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;
    }

    public String getFeedback(String resumeContent) {
        int wordCount = resumeContent.trim().split("\\s+").length;
        if (wordCount < MIN_WORDS) return "Resume is too short (" + wordCount + " words).";
        if (wordCount > MAX_WORDS) return "Resume is too long (" + wordCount + " words).";
        return "Length is fine.";
    }
}
