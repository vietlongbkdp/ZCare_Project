package com.cg.controller.api;

import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.Doctor;
import com.cg.service.avatar.AvatarService;
import com.cg.service.clinic.IClinicService;
import com.cg.service.doctor.DoctorServiceImpl;
import com.cg.service.position.IPositionService;
import com.cg.service.speciality.ISpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "*")
public class DoctorAPI {
    @Autowired
    private DoctorServiceImpl doctorService;
    @Autowired
    private AvatarService avatarService;
    @Autowired
    private IPositionService iPositionService;
    @Autowired
    private IClinicService clinicService;
    @Autowired
    private ISpecialityService specialityService;

    @GetMapping
    public ResponseEntity<?> getDoctors() {
        List<Doctor> doctorList = doctorService.findAll();
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.findById(id).get();
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @GetMapping("/byClinicId/{clinicId}")
    public ResponseEntity<?> getAllDoctorInClinic(@PathVariable Long clinicId) {
        List<Doctor> doctorList = doctorService.findAllDoctorInClinic(clinicId);
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody DoctorReqDTO doctorReqDTO) {
        doctorService.create(doctorReqDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody DoctorReqDTO doctorReqDTO) {
        Doctor updateDoctor = doctorService.findById(id).get();
        String updateAvatarImg = updateDoctor.getAvatarImg();

        updateDoctor.setPosition(iPositionService.findById(Long.parseLong(doctorReqDTO.getPosition())).get());
        updateDoctor.setDoctorName(doctorReqDTO.getDoctorName());
        updateDoctor.setDob(LocalDate.parse(doctorReqDTO.getDob()));
        updateDoctor.setEmail(doctorReqDTO.getEmail());
        updateDoctor.setPhone(doctorReqDTO.getPhone());
        updateDoctor.setFee(new BigDecimal(doctorReqDTO.getFee()));
        updateDoctor.setAvatarImg(doctorReqDTO.getAvatarImg());
        updateDoctor.setClinic(clinicService.findById(doctorReqDTO.getClinicId()).get());
        updateDoctor.setSpeciality(specialityService.findById(Long.parseLong(doctorReqDTO.getSpeciality())).get());
        doctorService.save(updateDoctor);

        if (!updateAvatarImg.equals(doctorReqDTO.getAvatarImg())) {
            avatarService.deleteImage(updateAvatarImg);
        }
        return new ResponseEntity<>(updateDoctor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Doctor deleteDoctor = doctorService.findById(id).get();
        doctorService.deleteById(id);
        avatarService.deleteImage(deleteDoctor.getAvatarImg());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
