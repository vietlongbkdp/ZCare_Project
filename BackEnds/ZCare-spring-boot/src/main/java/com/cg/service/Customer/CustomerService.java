package com.cg.service.Customer;

import com.cg.model.Customer;
import com.cg.model.DTO.CustomerReqDTO;
import com.cg.model.User;
import com.cg.model.enumeration.EGender;
import com.cg.model.enumeration.ERole;
import com.cg.repository.ICustomerRepository;
import com.cg.repository.IUserRepository;
import com.cg.until.PassDate;
import com.cg.until.PasswordEncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CustomerService implements ICustomerService{
    @Autowired
    private ICustomerRepository iCustomerRepository;
    @Autowired
    private IUserRepository iUserRepository;
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
        User user=new User();
        user.setFullName(customerReqDTO.getEmail());
        user.setPassword(PasswordEncryptionUtil.encryptPassword(customerReqDTO.getPassword()));
        user.setRole(ERole.ROLE_USER);
        iUserRepository.save(user);

        String date = customerReqDTO.getDob();
        Customer customer =new Customer();
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
}
