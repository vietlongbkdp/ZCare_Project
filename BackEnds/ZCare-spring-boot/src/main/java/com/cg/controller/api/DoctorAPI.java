package com.cg.controller.api;
import com.cg.model.Doctor;
import com.cg.repository.IClinicRepository;
import com.cg.repository.IDoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/doctor")
@CrossOrigin(origins = "*")
public class DoctorAPI {
    @Autowired
    private IDoctorRepository doctorService;
    @Autowired
    private IClinicRepository clinicRepository;
    @GetMapping
    public ResponseEntity<?> getDoctors(){
        List<Doctor> doctorList = doctorService.findAll();
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Doctor doctor){
//        Clinic clinic = clinicRepository.findById(doctor.getId()).get();
        Doctor createdoctor = doctorService.save(doctor);
        return new ResponseEntity<>(createdoctor,HttpStatus.OK);

    }

    @PatchMapping ("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody Doctor updatedDoctor) {
        // Kiểm tra xem bác sĩ có tồn tại trong cơ sở dữ liệu không
//        Doctor doctor = doctorService.findById(id).get();
//
//        // Cập nhật thông tin bác sĩ
//        doctor.setDoctorName(updatedDoctor.getDoctorName());
//        doctor.setPosition(updatedDoctor.getPosition());
//        doctor.setEmail(updatedDoctor.getEmail());
//        doctor.setPhone(updatedDoctor.getPhone());
//        doctor.setDoctorInfor(updatedDoctor.getDoctorInfor());
//
//        // Lưu thông tin bác sĩ được cập nhật vào cơ sở dữ liệu

         doctorService.save(updatedDoctor);
         return new ResponseEntity<>(updatedDoctor,HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> Delete(@PathVariable Long id){

        doctorService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
