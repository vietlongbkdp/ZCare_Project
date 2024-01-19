package com.cg.service.doctor;

import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.DTO.DoctorResDTO;
import com.cg.model.Doctor;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IDoctorService extends IGeneralService<Doctor,Long> {
    void create(DoctorReqDTO doctorReqDTO);
}
