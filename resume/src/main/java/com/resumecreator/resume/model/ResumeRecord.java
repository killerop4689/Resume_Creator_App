package com.resumecreator.resume.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
public class ResumeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String requestJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String responseJson;

    private int overallScore;

    private LocalDateTime createdAt;

    public ResumeRecord() {}

    public ResumeRecord(String userName, String requestJson, String responseJson, int overallScore) {
        this.userName = userName;
        this.requestJson = requestJson;
        this.responseJson = responseJson;
        this.overallScore = overallScore;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getRequestJson() { return requestJson; }
    public void setRequestJson(String requestJson) { this.requestJson = requestJson; }

    public String getResponseJson() { return responseJson; }
    public void setResponseJson(String responseJson) { this.responseJson = responseJson; }

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}