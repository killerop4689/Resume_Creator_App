package com.resumecreator.resume.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resumecreator.resume.model.ResumeRecord;

public interface ResumeRecordRepository extends JpaRepository<ResumeRecord, Long> {
    
}
