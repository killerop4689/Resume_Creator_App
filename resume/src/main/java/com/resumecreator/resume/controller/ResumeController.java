package com.resumecreator.resume.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resumecreator.resume.model.ResumeRecord;
import com.resumecreator.resume.model.ResumeRequest;
import com.resumecreator.resume.model.ResumeResponse;
import com.resumecreator.resume.repository.ResumeRecordRepository;
import com.resumecreator.resume.service.ResumeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/resume")  
public class ResumeController {
    
    @Autowired
    private ResumeService resumeService;

    @Autowired
    private ResumeRecordRepository resumeRecordRepository;

    @GetMapping("/")
    public String home() {
        return "Resume Creator API is running. Use POST /resume/generate to create resumes.";
    }

    @PostMapping("/generate")
    public ResumeResponse generateResume(@Valid @RequestBody ResumeRequest request){
        return resumeService.generateResume(request);
    }
    
    // @PostMapping("/validate")
    // public QualityReviewResult validateResume(@RequestBody ResumeRequest request){
    //     return resumeService.getValidationFeedback(request);
    // }

    //list every saved resume
    @GetMapping("/history")
    public List<ResumeRecord> getAllResumes() {
        return resumeRecordRepository.findAll();
    }

    // fetch one saved resume by its database id
    @GetMapping("/history/{id}")
    public ResumeRecord getResumeById(@PathVariable Long id) {
        return resumeRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
    }

}