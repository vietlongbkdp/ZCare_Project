package com.cg.repository;

import com.cg.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRatingRepository extends JpaRepository<Rating,Long> {
    List<Rating> findByDoctorId(Long doctorId);
}
