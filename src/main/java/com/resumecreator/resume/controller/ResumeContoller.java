package com.resumecreator.resume.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumecreator.resume.model.ResumeRequest;
import com.resumecreator.resume.model.ResumeResponse;
import com.resumecreator.resume.service.ResumeService;


@RestController
@RequestMapping("/resume")  
public class ResumeContoller {
    
    @Autowired
    private ResumeService resumeService;

    @GetMapping("/")
    public String home() {
        return "Resume Creator API is running. Use POST /resume/generate to create resumes.";
    }

    @PostMapping("/generate")
    public ResumeResponse generateResume(@RequestBody ResumeRequest request){
        return resumeService.generateResume(request);
    }
    
    // @PostMapping("/validate")
    // public QualityReviewResult validateResume(@RequestBody ResumeRequest request){
    //     return resumeService.getValidationFeedback(request);
    // }

}