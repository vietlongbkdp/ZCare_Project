package com.cg.controller.api;

import com.cg.model.Clinic;
import com.cg.model.Customer;
import com.cg.model.DTO.LockStatusReqDTO;
import com.cg.model.Doctor;
import com.cg.model.User;
import com.cg.service.User.UserService;
import com.cg.service.avatar.AvatarService;
import com.cg.service.clinic.IClinicService;
import com.cg.service.doctor.DoctorServiceImpl;
import com.cg.service.doctor.IDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinic")
@CrossOrigin(origins = "*")
public class ClinicAPI {
    @Autowired
    public IClinicService clinicService;
    @Autowired
    public AvatarService avatarService;
    @Autowired
    private UserService userService;
    @Autowired
    private DoctorServiceImpl doctorService;

    @GetMapping
    public ResponseEntity<?> getAllClinic() {
        List<Clinic> clinicList = clinicService.findAllByUser_Unlock(true);
        return new ResponseEntity<>(clinicList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClinic(@PathVariable Long id) {
        Clinic clinic = clinicService.findById(id).get();
        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @GetMapping("/getClinicbyIdDoctor/{idDoctor}")
    public ResponseEntity<?> getClinicByDoctorId(@PathVariable Long idDoctor){
        Clinic clinic = doctorService.findById(idDoctor).get().getClinic();
        return new ResponseEntity<>(clinic, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createClinic(@RequestBody Clinic clinic) {
        try {
            clinicService.save(clinic);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create clinic", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateClinic(@PathVariable Long id, @RequestBody Clinic clinic) {
        Clinic updateClinic = clinicService.findById(id).get();
        String updateClinicLogo = updateClinic.getClinicLogo();

        updateClinic.setClinicName(clinic.getClinicName());
        updateClinic.setLegalRepresentative(clinic.getLegalRepresentative());
        updateClinic.setEmail(clinic.getEmail());
        updateClinic.setHotline(clinic.getHotline());
        updateClinic.setOperatingLicence(clinic.getOperatingLicence());
        updateClinic.setAddress(clinic.getAddress());
        updateClinic.setClinicInfo(clinic.getClinicInfo());
        updateClinic.setClinicLogo(clinic.getClinicLogo());
        clinicService.update(updateClinic);
        if (!updateClinicLogo.equals(clinic.getClinicLogo())) {
            avatarService.deleteImage(updateClinicLogo);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/lock/{id}")
    public ResponseEntity<?> ChangeLock(@PathVariable Long id, @RequestBody LockStatusReqDTO lockStatusReqDTO) {
        User user = userService.findById(lockStatusReqDTO.getUserId()).get();
        user.setUnlock(false);
        userService.save(user);
        Clinic clinic = clinicService.findById(id).get();
        clinic.setUser(user);
        List<Doctor> doctorList = doctorService.findAllDoctorInClinic(clinic.getId());
        for (Doctor doctor : doctorList) {
            User userdoctor = doctor.getUser();
            userdoctor.setUnlock(false);
            doctor.setUser(userdoctor);
            doctorService.save(doctor);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
