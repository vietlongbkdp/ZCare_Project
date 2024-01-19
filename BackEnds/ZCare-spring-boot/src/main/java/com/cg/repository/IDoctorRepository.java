package com.cg.repository;

import com.cg.model.DTO.DoctorResDTO;
import com.cg.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findDoctorsByClinicId(Long clinicId);
}
