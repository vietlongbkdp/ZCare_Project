package com.cg.repository;

import com.cg.model.MedicineDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMedicineDetailRepository extends JpaRepository<MedicineDetail, Long> {
}
