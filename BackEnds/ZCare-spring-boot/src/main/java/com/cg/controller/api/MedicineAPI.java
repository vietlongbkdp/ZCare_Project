package com.cg.controller.api;

import com.cg.model.Medicine;
import com.cg.service.medicine.IMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicine")
@CrossOrigin(origins = "*")
public class MedicineAPI {
    @Autowired
    private IMedicineService medicineService;
    @GetMapping
    public ResponseEntity<?> getAllMedicine(){
        List<Medicine> medicineList = medicineService.findAll();
        return new ResponseEntity<>(medicineList, HttpStatus.OK);
    }
}
