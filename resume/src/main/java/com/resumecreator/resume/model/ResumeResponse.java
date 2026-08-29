package com.resumecreator.resume.model;

import java.util.List;

public class ResumeResponse {

    private Resume resume;
    private List<String> interviewQuestions;
    private String error; // null when everything parsed successfully

    public ResumeResponse() {}

    public ResumeResponse(Resume resume, List<String> interviewQuestions) {
        this.resume = resume;
        this.interviewQuestions = interviewQuestions;
    }

    public Resume getResume() { return resume; }
    public void setResume(Resume resume) { this.resume = resume; }

    public List<String> getInterviewQuestions() { return interviewQuestions; }
    public void setInterviewQuestions(List<String> interviewQuestions) { this.interviewQuestions = interviewQuestions; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}
