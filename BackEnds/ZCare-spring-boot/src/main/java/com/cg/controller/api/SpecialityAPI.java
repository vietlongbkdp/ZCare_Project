package com.cg.controller.api;

import com.cg.model.Speciality;
import com.cg.service.speciality.ISpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/speciality")
@CrossOrigin(origins = "*")
public class SpecialityAPI {
    @Autowired
    private ISpecialityService specialityService;
    @GetMapping
    public ResponseEntity<?> getAllSpeciality() {
        List<Speciality> listSpeciality = specialityService.findAll();
        return new ResponseEntity<>(listSpeciality, HttpStatus.OK);
    }
}
