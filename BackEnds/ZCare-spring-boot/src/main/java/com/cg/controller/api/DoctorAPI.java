package com.cg.controller.api;
import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.DTO.LockStatusReqDTO;
import com.cg.model.Doctor;
import com.cg.model.User;
import com.cg.model.DTO.DoctorResDTO;
import com.cg.service.User.IUserService;
import com.cg.service.avatar.AvatarService;
import com.cg.model.Schedule;
import com.cg.service.clinic.IClinicService;
import com.cg.service.doctor.DoctorServiceImpl;
import com.cg.service.position.IPositionService;
import com.cg.service.schedule.IScheduleService;
import com.cg.service.speciality.ISpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctor")
@CrossOrigin(origins = "*")
public class DoctorAPI {
    @Autowired
    private DoctorServiceImpl doctorService;
    @Autowired
    private AvatarService avatarService;
    @Autowired
    private IPositionService iPositionService;
    @Autowired
    private IClinicService clinicService;
    @Autowired
    private ISpecialityService specialityService;
    @Autowired
    private IScheduleService scheduleService;
    @Autowired
    private IUserService userService;


    @GetMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDoctors() {
        List<Doctor> doctorList = doctorService.findAllByUser_Unlock(true);
        return new ResponseEntity<>(doctorList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<Doctor> getDoctorsWithFilters(@RequestParam(value = "specialityId", required = false) Long specialityId,
                                              @RequestParam(value = "clinicId", required = false) Long clinicId,
                                              @RequestParam(value = "doctorName", required = false) String doctorName) {
        return doctorService.findDoctorsWithFilters(specialityId, clinicId, doctorName);
    }

    @GetMapping("/schedule")
    public ResponseEntity<?> getDoctorSchedule() {
        List<Doctor> doctorList = doctorService.findAll();
        doctorList.forEach((doctor) -> {
            List<Schedule> scheduleList = scheduleService.findAllByDoctorId(doctor.getId());
            doctor.setScheduleList(scheduleList);
        });
        List<DoctorResDTO> doctorResDTOList = doctorList.stream().map(Doctor::toDoctorResDTO).toList();
        return new ResponseEntity<>(doctorResDTOList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        Doctor doctor = doctorService.findById(id).get();
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody DoctorReqDTO doctorReqDTO) {
        doctorService.create(doctorReqDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/byClinicId/{clinicId}")
    public ResponseEntity<?> getAllDoctorInClinic(@PathVariable Long clinicId) {
        List<Doctor> doctorList = doctorService.findAllDoctorInClinic(clinicId);
        List<Doctor> doctorList1 = doctorList.stream().filter(doctor -> doctor.getUser().isUnlock()).collect(Collectors.toList());
        return new ResponseEntity<>(doctorList1, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody DoctorReqDTO doctorReqDTO) {
        Doctor updateDoctor = doctorService.findById(id).get();
        String updateAvatarImg = updateDoctor.getAvatarImg();

        updateDoctor.setPosition(iPositionService.findById(Long.parseLong(doctorReqDTO.getPosition())).get());
        updateDoctor.setDoctorName(doctorReqDTO.getDoctorName());
        updateDoctor.setDob(LocalDate.parse(doctorReqDTO.getDob()));
        updateDoctor.setEmail(doctorReqDTO.getEmail());
        updateDoctor.setPhone(doctorReqDTO.getPhone());
        updateDoctor.setFee(new BigDecimal(doctorReqDTO.getFee()));
        updateDoctor.setAvatarImg(doctorReqDTO.getAvatarImg());
        updateDoctor.setClinic(clinicService.findById(doctorReqDTO.getClinicId()).get());
        updateDoctor.setSpeciality(specialityService.findById(Long.parseLong(doctorReqDTO.getSpeciality())).get());
        updateDoctor.setDoctorInfo(doctorReqDTO.getDoctorInfo());
//        doctorService.save(updateDoctor);

        if (!updateAvatarImg.equals(doctorReqDTO.getAvatarImg())) {
            avatarService.deleteImage(updateAvatarImg);
        }
        return new ResponseEntity<>(updateDoctor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Doctor deleteDoctor = doctorService.findById(id).get();
        doctorService.deleteById(id);
        avatarService.deleteImage(deleteDoctor.getAvatarImg());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/lock/{id}")
    public ResponseEntity<?> ChangeLock(@PathVariable Long id, @RequestBody LockStatusReqDTO lockStatusReqDTO){
        User user= userService.findById(lockStatusReqDTO.getUserId()).get();
        user.setUnlock(false);
        userService.save(user);
        Doctor doctor = doctorService.findById(id).get();
        doctor.setUser(user);
        doctorService.save(doctor);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
