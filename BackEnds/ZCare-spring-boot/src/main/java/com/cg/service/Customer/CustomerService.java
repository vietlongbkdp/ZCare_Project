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
import com.cg.util.EmailUtil;
import com.cg.util.PasswordEncryptionUtil;
import com.cg.util.RandomCode;
import com.cg.util.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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
    private EmailUtil emailUtil;
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
        user.setEmail(customerReqDTO.getEmail());
        user.setPassword(PasswordEncryptionUtil.encryptPassword(customerReqDTO.getPassword()));
        user.setRole(ERole.ROLE_CUSTOMER);
        iUserRepository.save(user);

        String date = customerReqDTO.getDob();
        Customer customer = new Customer();
        customer.setUser(user);
        customer.setFullName(customerReqDTO.getFullName());
        customer.setPhone(customerReqDTO.getPhone());
        customer.setEmail(customerReqDTO.getEmail());
        customer.setAddress(customerReqDTO.getAddress());
        customer.setDob(LocalDate.parse(date));
        customer.setGender(EGender.valueOf(customerReqDTO.getGender()));
        iCustomerRepository.save(customer);
    }

    @Override
    public Optional<Customer> findCustomerByEmail(String email) {
        return iCustomerRepository.findCustomerByEmail(email);
    }

    @Override
    public boolean confirmEmail(EmailReqDTO emailReqDTO) {
        User user = iUserRepository.findByEmail(emailReqDTO.getEmail()).get();
        if (user != null) {
            String email=emailReqDTO.getEmail();
            String title="Yêu cầu đặt lại mật khẩu";
            String code = RandomCode.generateRandomCode(6);
            user.setCode(code);
            iUserRepository.save(user);
            String body= SendEmail.EmailResetPassword(user.getEmail(),code);
            emailUtil.sendEmail(email,title,body);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean forgotPassword(ForgotPassword forgotPassword) {
        User user = iUserRepository.findByEmail(forgotPassword.getEmail()).get();
        return user != null && (forgotPassword.getCode()).equals(user.getCode());
    }

    @Override
    public List<Customer> findAllByUser_Unlock(boolean user_unlock) {
        return iCustomerRepository.findAllByUser_Unlock(user_unlock);
    }

    @Override
    public Customer findByUser_Id(Long id) {
        return iCustomerRepository.findByUser_Id(id);
    }

}
