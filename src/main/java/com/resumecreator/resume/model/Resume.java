package com.resumecreator.resume.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Resume {

    @JsonProperty("contact_information")
    private ContactInformation contactInformation = new ContactInformation();

    private String summary = "";
    private List<String> skills = new ArrayList<>();
    private List<ExperienceEntry> experience = new ArrayList<>();
    private List<ProjectEntry> projects = new ArrayList<>();
    private List<String> education = new ArrayList<>();

    public ContactInformation getContactInformation() { return contactInformation; }
    public void setContactInformation(ContactInformation contactInformation) { this.contactInformation = contactInformation; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<ExperienceEntry> getExperience() { return experience; }
    public void setExperience(List<ExperienceEntry> experience) { this.experience = experience; }

    public List<ProjectEntry> getProjects() { return projects; }
    public void setProjects(List<ProjectEntry> projects) { this.projects = projects; }

    public List<String> getEducation() { return education; }
    public void setEducation(List<String> education) { this.education = education; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ContactInformation {
        private String name = "";
        private String email = "";
        private String phone = "";

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ExperienceEntry {
        private String role = "";
        private String company = "";

        @JsonAlias({"duration"})
        private String period = "";

        @JsonProperty("bullet_points")
        @JsonAlias({"bullets"})
        private List<String> bulletPoints = new ArrayList<>();

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }
        public String getPeriod() { return period; }
        public void setPeriod(String period) { this.period = period; }
        public List<String> getBulletPoints() { return bulletPoints; }
        public void setBulletPoints(List<String> bulletPoints) { this.bulletPoints = bulletPoints; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ProjectEntry {
        private String title = "";
        private List<String> technologies = new ArrayList<>();

        @JsonProperty("bullet_points")
        @JsonAlias({"bullets"})
        private List<String> bulletPoints = new ArrayList<>();

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public List<String> getTechnologies() { return technologies; }
        public void setTechnologies(List<String> technologies) { this.technologies = technologies; }
        public List<String> getBulletPoints() { return bulletPoints; }
        public void setBulletPoints(List<String> bulletPoints) { this.bulletPoints = bulletPoints; }
    }
}
