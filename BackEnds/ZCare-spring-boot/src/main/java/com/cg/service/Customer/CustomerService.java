package com.cg.service.Customer;

import com.cg.model.Customer;
import com.cg.model.DTO.CustomerReqDTO;
import com.cg.model.DTO.EmailReqDTO;
import com.cg.model.DTO.ForgotPassword;
import com.cg.model.User;
import com.cg.model.enumeration.EGender;
import com.cg.model.enumeration.ERole;
import com.cg.repository.ICustomerRepository;
import com.cg.repository.IUserRepository;
import com.cg.until.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;
    @Autowired
    private IUserRepository iUserRepository;

    @Autowired
    private EmailUntil emailUntil;
    @Override
    public List<Customer> findAll() {
        return iCustomerRepository.findAll();
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return iCustomerRepository.findById(id);
    }

    @Override
    public void save(Customer customer) {
        iCustomerRepository.save(customer);
    }

    @Override
    public void deleteById(Long id) {
        iCustomerRepository.deleteById(id);
    }

    @Override
    public void register(CustomerReqDTO customerReqDTO) {
        User user = new User();
        user.setFullName(customerReqDTO.getEmail());
        user.setPassword(PasswordEncryptionUtil.encryptPassword(customerReqDTO.getPassword()));
        user.setRole(ERole.ROLE_USER);
        iUserRepository.save(user);

        String date = customerReqDTO.getDob();
        Customer customer = new Customer();
        customer.setUser(user);
        customer.setFullName(customerReqDTO.getFullName());
        customer.setPhone(customerReqDTO.getPhone());
        customer.setEmail(customerReqDTO.getEmail());
        customer.setAddress(customerReqDTO.getAddress());
        customer.setDob(PassDate.convertToDate(date));
        customer.setGender(EGender.valueOf(customerReqDTO.getGender()));
        iCustomerRepository.save(customer);
    }

    @Override
    public Optional<Customer> findCustomerByEmail(String email) {
        return iCustomerRepository.findCustomerByEmail(email);
    }

    @Override
    public boolean confirmEmail(EmailReqDTO emailReqDTO) {
        User user = iUserRepository.findByFullName(emailReqDTO.getEmail());
        if (user != null) {
            String email=emailReqDTO.getEmail();
            String title="Yêu cầu đặt lại mật khẩu";
            String code = RandomCode.generateRandomCode(6);
            user.setCode(code);
            iUserRepository.save(user);
            String body= SendEmail.EmailResetPassword(user.getFullName(),code);
            emailUntil.sendEmail(email,title,body);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean forgotPassword(ForgotPassword forgotPassword) {
        User user = iUserRepository.findByFullName(forgotPassword.getEmail());
        return user != null && (forgotPassword.getCode()).equals(user.getCode());
    }
}
