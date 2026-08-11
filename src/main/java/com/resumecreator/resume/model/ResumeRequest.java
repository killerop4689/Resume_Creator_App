package com.resumecreator.resume.model;
import java.util.List;

public class ResumeRequest {
    private String name;
    private String email;
    private String phone;
    private List<String> skills;
   // private List<String> experience;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    // public List<String> getExperience() {
    //     return experience;
    // }

    // public void setExperience(List<String> experience) {
    //     this.experience = experience;
    //}
    
}
