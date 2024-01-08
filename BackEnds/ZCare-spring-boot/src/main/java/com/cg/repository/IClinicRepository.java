package com.cg.repository;

import com.cg.model.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IClinicRepository extends JpaRepository<Clinic, Long> {
}
