package com.cg.service.doctor;
import com.cg.model.Clinic;
import com.cg.model.DTO.DoctorReqDTO;
import com.cg.model.Doctor;
import com.cg.model.Speciality;
import com.cg.model.User;
import com.cg.model.enumeration.ERole;
import com.cg.model.enumeration.ELockStatus;
import com.cg.repository.IDoctorRepository;
import com.cg.repository.IPositionRepository;
import com.cg.repository.IUserRepository;
import com.cg.service.clinic.IClinicService;
import com.cg.service.position.IPositionService;
import com.cg.service.speciality.ISpecialityService;
import com.cg.until.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorServiceImpl implements IDoctorService{
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
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private EmailUntil emailUntil;

    @Override
    public List<Doctor> findAll() {
        return doctorRepository.findAll();
    }

    @Override
    public Optional<Doctor> findById(Long id) {
        return doctorRepository.findById(id);
    }

    public List<Doctor> findAllDoctorInClinic(Long clinicId) {
        return doctorRepository.findDoctorsByClinicId(clinicId);
    }
    @Override
    public void save(Doctor doctor) {

    }

    @Override
    public void create(DoctorReqDTO doctorReqDTO) {
        String password = RandomCode.generateRandomCode(6);
        User user =new User();
        user.setEmail(doctorReqDTO.getEmail());
        user.setPassword(PasswordEncryptionUtil.encryptPassword(password));
        user.setRole(ERole.ROLE_DOCTOR);
        user.setUnlock(true);
        iUserRepository.save(user);

        String title="Chúc mừng! Tài khoản ZCare đã được tạo thành công";
        String body= SendEmail.EmailRegisterDoctor(doctorReqDTO.getDoctorName(),password,doctorReqDTO.getEmail());
        emailUntil.sendEmail(doctorReqDTO.getEmail(),title,body);

        Doctor doctor = new Doctor();
        doctor.setPosition(iPositionService.findById(Long.parseLong(doctorReqDTO.getPosition())).get());
        doctor.setDoctorName(doctorReqDTO.getDoctorName());
        doctor.setDob(LocalDate.parse(doctorReqDTO.getDob()));
        doctor.setEmail(doctorReqDTO.getEmail());
        doctor.setPhone(doctorReqDTO.getPhone());
        doctor.setFee(new BigDecimal(doctorReqDTO.getFee()));
        doctor.setAvatarImg(doctorReqDTO.getAvatarImg());
        doctor.setCreateAt(LocalDate.now());
        doctor.setClinic(clinicService.findById(doctorReqDTO.getClinicId()).get());
        doctor.setSpeciality(specialityService.findById(Long.parseLong(doctorReqDTO.getSpeciality())).get());
        doctor.setStar(5);
        doctor.setUser(user);
        doctor.setLockStatus(ELockStatus.valueOf("UNLOCK"));
        doctorRepository.save(doctor);
    }

    public List<Doctor> findDoctorsWithFilters(Long specialityId, Long clinicId, String doctorName) {
        return doctorRepository.findDoctorsWithFilters(specialityId, clinicId, doctorName);
    }

    @Override
    public void deleteById(Long id) {
         doctorRepository.deleteById(id);
    }

    @Override
    public List<Doctor> findAllByUser_Unlock(boolean user_unlock) {
        return doctorRepository.findAllByUser_Unlock(user_unlock);
    }
}
