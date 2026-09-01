package com.resumecreator.resume.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

    // REMOVE THIS:
    // @Autowired
    // private ObjectMapper objectMapper;

    // REPLACE WITH THIS:
    private final ObjectMapper objectMapper = new ObjectMapper();

   
    private String getCurrentUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/")
    public String home() {
        return "Resume Creator API is running. Use POST /resume/generate to create resumes.";
    }

    @PostMapping("/generate")
    public ResumeResponse generateResume(@Valid @RequestBody ResumeRequest request){

        
        String currentUserName = getCurrentUserName();

    
        ResumeResponse response = resumeService.generateResume(request);

        
        try {
            String requestJson = objectMapper.writeValueAsString(request);
            String responseJson = objectMapper.writeValueAsString(response);
            
            ResumeRecord record = new ResumeRecord();
            record.setUserName(currentUserName);
            record.setRequestJson(requestJson);
            record.setResponseJson(responseJson);

            resumeRecordRepository.save(record);
            

        } catch (JsonProcessingException e) {
            
            e.printStackTrace();
        }

        return response;
    }
    
    // @PostMapping("/validate")
    // public QualityReviewResult validateResume(@RequestBody ResumeRequest request){
    //     return resumeService.getValidationFeedback(request);
    // }

    @GetMapping("/history")
    public List<ResumeRecord> getUserHistory() {
        String currentUserName = getCurrentUserName();
        return resumeRecordRepository.findByUserName(currentUserName);
    }

    @GetMapping("/history/{id}")
    public ResumeRecord getResumeById(@PathVariable Long id) {
        String currentUserName = getCurrentUserName();

        ResumeRecord record = resumeRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));

        
        if (!record.getUserName().equals(currentUserName)) {
            throw new RuntimeException("Access denied: You do not own this resume.");
        }

        return record;
    }

}