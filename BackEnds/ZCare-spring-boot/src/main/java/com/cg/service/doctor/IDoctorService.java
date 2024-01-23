package com.cg.service.doctor;

import com.cg.model.Clinic;
import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.DTO.DoctorResDTO;
import com.cg.model.Doctor;
import com.cg.model.Speciality;
import com.cg.model.enumeration.ELockStatus;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IDoctorService extends IGeneralService<Doctor,Long> {
    void create(DoctorReqDTO doctorReqDTO);
    List<Doctor> findDoctorsWithFilters(Long specialityId, Long clinicId, String doctorName);
    List<Doctor> findAllByUser_Unlock(boolean user_unlock);
}
