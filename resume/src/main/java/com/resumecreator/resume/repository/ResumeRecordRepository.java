package com.resumecreator.resume.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.resumecreator.resume.model.ResumeRecord;

public interface ResumeRecordRepository extends JpaRepository<ResumeRecord, Long> {
    List<ResumeRecord> findByUserName(String userName);
}
