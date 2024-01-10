package com.cg.controller.api;

import com.cg.model.Clinic;
import com.cg.service.clinic.IClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/clinic")
@CrossOrigin(origins = "*")
public class ClinicAPI {
    @Autowired
    public IClinicService clinicService;
    @GetMapping
    public ResponseEntity<?> getAllClinic() {
        List<Clinic> clinicList = clinicService.findAll();
        return new ResponseEntity<>(clinicList, HttpStatus.OK);
    }
}
