package com.cg.service.doctor;

import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.Doctor;
import com.cg.service.IGeneralService;

public interface IDoctorService extends IGeneralService<Doctor,Long> {
    void create(DoctorReqDTO doctorReqDTO);
}
