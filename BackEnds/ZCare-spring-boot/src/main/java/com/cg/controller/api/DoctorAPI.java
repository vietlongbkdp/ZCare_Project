package com.cg.controller.api;

import com.cg.model.Doctor;
import com.cg.repository.IDoctorRepository;
import com.cg.service.doctor.IDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/doctor")
@CrossOrigin(origins = "*")
public class DoctorAPI {
    @Autowired
    private IDoctorRepository doctorService;
    @GetMapping
    public ResponseEntity<?> getDoctors(){
        List<Doctor> doctorList = doctorService.findAll();
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }
}
