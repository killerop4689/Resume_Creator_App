package com.resumecreator.resume.model;

import java.util.List;

public class QualityReviewResult {
    private int overallScore;
    private String decision; // "REVISE" or "FINISH"
    private List<String> unsupportedClaims;
    private List<String> bulletIssues;
    private List<String> improvements;

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }

    public List<String> getUnsupportedClaims() { return unsupportedClaims; }
    public void setUnsupportedClaims(List<String> unsupportedClaims) { this.unsupportedClaims = unsupportedClaims; }

    public List<String> getBulletIssues() { return bulletIssues; }
    public void setBulletIssues(List<String> bulletIssues) { this.bulletIssues = bulletIssues; }

    public List<String> getImprovements() { return improvements; }
    public void setImprovements(List<String> improvements) { this.improvements = improvements; }
}
