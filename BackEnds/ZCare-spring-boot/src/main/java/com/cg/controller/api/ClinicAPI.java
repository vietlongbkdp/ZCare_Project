package com.cg.controller.api;

import com.cg.model.Clinic;
import com.cg.service.avatar.AvatarService;
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
    @Autowired
    public AvatarService avatarService;
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
        Clinic editClinic = clinicService.findById(id).get();
        String editClinicLogo = editClinic.getClinicLogo();

        editClinic.setClinicName(clinic.getClinicName());
        editClinic.setLegalRepresentative(clinic.getLegalRepresentative());
        editClinic.setHotline(clinic.getHotline());
        editClinic.setOperatingLicence(clinic.getOperatingLicence());
        editClinic.setAddress(clinic.getAddress());
        editClinic.setClinicInfo(clinic.getClinicInfo());
        editClinic.setClinicLogo(clinic.getClinicLogo());
        clinicService.save(editClinic);
        if (!editClinicLogo.equals(clinic.getClinicLogo())) {
            avatarService.deleteImage(editClinic.getClinicLogo());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClinic(@PathVariable Long id){
        Clinic deleteClinic = clinicService.findById(id).get();
        clinicService.deleteById(id);
        avatarService.deleteImage(deleteClinic.getClinicLogo());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
