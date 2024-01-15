package com.cg.controller.api;
import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.Doctor;
import com.cg.repository.IClinicRepository;
import com.cg.repository.IDoctorRepository;
import com.cg.repository.IPositionRepository;
import com.cg.service.clinic.IClinicService;
import com.cg.service.doctor.DoctorServiceImpl;
import com.cg.service.doctor.IDoctorService;
import com.cg.service.position.IPositionService;
import com.cg.service.speciality.ISpecialityService;
import com.cg.until.PassDate;
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
    private IClinicRepository clinicRepository;

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
    @GetMapping
    public ResponseEntity<?> getDoctors(){
        List<Doctor> doctorList = doctorService.findAll();
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorID(@PathVariable Long id){
        Doctor doctor = doctorService.findById(id).get();
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody DoctorReqDTO doctorReqDTO){
        doctorService.create(doctorReqDTO);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @PatchMapping ("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody DoctorReqDTO doctorReqDTO) {

        Doctor doctor = doctorService.findById(id).get();
        doctor.setPosition(iPositionService.findById(Long.parseLong(doctorReqDTO.getPosition())).get());
        doctor.setDoctorName(doctorReqDTO.getDoctorName());
        doctor.setDob(PassDate.convertToDate(doctorReqDTO.getDob()));
        doctor.setEmail(doctorReqDTO.getEmail());
        doctor.setPhone(doctorReqDTO.getPhone());
        doctor.setFee(new BigDecimal(doctorReqDTO.getFee()));
        doctor.setAvatarImg(doctorReqDTO.getAvatarImg());
        doctor.setClinic(clinicService.findById(Long.parseLong(doctorReqDTO.getClinic())).get());
        doctor.setSpeciality(specialityService.findById(Long.parseLong(doctorReqDTO.getSpeciality())).get());


         doctorService.save(doctor);
         return new ResponseEntity<>(doctor,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> Delete(@PathVariable Long id){

        doctorService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
