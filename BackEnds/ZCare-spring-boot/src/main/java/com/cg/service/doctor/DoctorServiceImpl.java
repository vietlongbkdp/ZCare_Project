package com.cg.service.doctor;


import com.cg.model.Clinic;
import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.DTO.DoctorResDTO;
import com.cg.model.Doctor;
import com.cg.repository.IDoctorRepository;
import com.cg.repository.IPositionRepository;
import com.cg.service.clinic.IClinicService;
import com.cg.service.position.IPositionService;
import com.cg.service.speciality.ISpecialityService;
import com.cg.until.PassDate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorServiceImpl implements IDoctorService{
    @Autowired
    private IPositionService iPositionService;
    @Autowired
    private IPositionRepository positionRepository;
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private IClinicService clinicService;
    @Autowired
    private ISpecialityService specialityService;

    @Override
    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    @Override
    public Optional<Doctor> findById(Long id) {
        return doctorRepository.findById(id);
    }

    public List<Doctor> findAllDoctorInClinic(Long clinicId) {
        return doctorRepository.findDoctorsByClinicId(clinicId);
    }
    @Override
    public void save(Doctor doctor) {

    }

    @Override
    public void create(DoctorReqDTO doctorReqDTO) {
        Doctor doctor = new Doctor();
        doctor.setPosition(iPositionService.findById(Long.parseLong(doctorReqDTO.getPosition())).get());
        doctor.setDoctorName(doctorReqDTO.getDoctorName());
        doctor.setDob(LocalDate.parse(doctorReqDTO.getDob()));
        doctor.setEmail(doctorReqDTO.getEmail());
        doctor.setPhone(doctorReqDTO.getPhone());
        doctor.setFee(new BigDecimal(doctorReqDTO.getFee()));
        doctor.setAvatarImg(doctorReqDTO.getAvatarImg());
        doctor.setCreateAt(LocalDate.now());
        doctor.setClinic(clinicService.findById(doctorReqDTO.getClinicId()).get());
        doctor.setSpeciality(specialityService.findById(Long.parseLong(doctorReqDTO.getSpeciality())).get());
        doctor.setStar(0);

        doctorRepository.save(doctor);

    }

    @Override
    public void deleteById(Long id) {
         doctorRepository.deleteById(id);
    }
}
