package com.cg.repository;

import com.cg.model.Clinic;
import com.cg.model.Customer;
import com.cg.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IClinicRepository extends JpaRepository<Clinic, Long> {
    List<Clinic> findAllByUser_Unlock(boolean user_unlock);
    Clinic findByUser_Id(Long id);
}
