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

    @PatchMapping("/{id}")
    public ResponseEntity<?> editClinic(@PathVariable Long id, @RequestBody Clinic clinic){
        Clinic clinic1 = clinicService.findById(id).get();
        clinic1.setClinicName(clinic.getClinicName());
        clinic1.setAddress(clinic.getAddress());
        clinic1.setClinicInfo(clinic.getClinicInfo());
        clinicService.save(clinic1);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClinic(@PathVariable Long id){
        clinicService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
