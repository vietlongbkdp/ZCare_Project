package com.cg.controller.api;

import com.cg.model.Clinic;
import com.cg.service.clinic.IClinicService;
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
    @GetMapping
    public ResponseEntity<?> getAllClinic() {
        List<Clinic> clinicList = clinicService.findAll();
        return new ResponseEntity<>(clinicList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClinic (@PathVariable Long id){
        Clinic clinic = clinicService.findById(id).get();
        return new ResponseEntity<>(clinic,HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> createClinic(@RequestBody Clinic clinic){
       try{
           clinicService.save(clinic);
           return new ResponseEntity<>(HttpStatus.OK);
       }catch (Exception e) {
           return new ResponseEntity<>("Failed to create clinic", HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
