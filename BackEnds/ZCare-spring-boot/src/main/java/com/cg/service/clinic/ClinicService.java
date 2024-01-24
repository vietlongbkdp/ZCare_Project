package com.cg.service.clinic;

import com.cg.model.Clinic;
import com.cg.model.User;
import com.cg.model.enumeration.ERole;
import com.cg.repository.IClinicRepository;
import com.cg.repository.IUserRepository;
import com.cg.until.EmailUntil;
import com.cg.until.PasswordEncryptionUtil;
import com.cg.until.RandomCode;
import com.cg.until.SendEmail;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClinicService implements IClinicService {
    @Autowired
    private IClinicRepository clinicRepository;
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private EmailUntil emailUntil;

    @Override
    public List<Clinic> findAll() {
        return clinicRepository.findAll();
    }

    @Override
    public Optional<Clinic> findById(Long id) {
        return clinicRepository.findById(id);
    }

    @Override
    public void save(Clinic clinic) {
        String password = RandomCode.generateRandomCode(6);
        User user = new User();
        user.setEmail(clinic.getEmail());
        user.setPassword(PasswordEncryptionUtil.encryptPassword(password));
        user.setRole(ERole.ROLE_ADMIN_CLINIC);
        iUserRepository.save(user);

        String title = "Chúc mừng! Tài khoản ZCare đã được tạo thành công";
        String body = SendEmail.EmailRegisterDoctor(clinic.getClinicName(), password, clinic.getEmail());
        emailUntil.sendEmail(clinic.getEmail(), title, body);
        clinic.setUser(user);
        clinicRepository.save(clinic);
    }

    @Override
    public void deleteById(Long id) {
        clinicRepository.deleteById(id);
    }
}
