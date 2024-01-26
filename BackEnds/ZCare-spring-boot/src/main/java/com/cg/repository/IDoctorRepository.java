package com.cg.repository;

import com.cg.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findDoctorsByClinicId(Long clinicId);

    @Query("SELECT d FROM Doctor d " +
            "WHERE (:specialityId IS NULL OR d.speciality.id = :specialityId) " +
            "  AND (:clinicId IS NULL OR d.clinic.id = :clinicId) " +
            "  AND (:doctorName IS NULL OR LOWER(d.doctorName) LIKE LOWER(CONCAT('%', :doctorName, '%'))) ")
    List<Doctor> findDoctorsWithFilters(@Param("specialityId") Long specialityId,
                                        @Param("clinicId") Long clinicId,
                                        @Param("doctorName") String doctorName);

    List<Doctor> findAllByUser_Unlock(boolean user_unlock);

    Doctor findByUser_Id(Long id);
}

