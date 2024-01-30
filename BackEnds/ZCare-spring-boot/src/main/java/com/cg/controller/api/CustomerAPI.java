package com.cg.controller.api;
import com.cg.model.Clinic;
import com.cg.model.Customer;
import com.cg.model.DTO.LockStatusReqDTO;
import com.cg.model.DTO.UpdateCustomer;
import com.cg.model.Doctor;
import com.cg.model.User;
import com.cg.model.enumeration.EGender;
import com.cg.service.Customer.CustomerService;
import com.cg.service.User.UserService;
import com.cg.until.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerAPI {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Customer> customerList=customerService.findAllByUser_Unlock(true);
        return new ResponseEntity<>(customerList, HttpStatus.OK);
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long userId){
        Customer customer=customerService.findByUser_Id(userId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getCustomerByIdCus(@PathVariable Long userId){
            Customer customer = customerService.findByUser_Id(userId);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
    @GetMapping("/getCustomer/{idCustomer}")
    public ResponseEntity<?> getCustomerByIdCustomer(@PathVariable Long idCustomer){
        Customer customer = customerService.findById(idCustomer).get();
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }
    @PutMapping("/{userId}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long userId, @RequestBody UpdateCustomer updateCustomer){
        Customer customer = customerService.findByUser_Id(userId);
        customer.setFullName(updateCustomer.getFullName());
        customer.setEmail(updateCustomer.getEmail());
        customer.setPhone(updateCustomer.getPhone());
        customer.setGender(EGender.valueOf(updateCustomer.getGender()));
        customer.setDob(DateUtils.parseDate(updateCustomer.getDob()));
        customer.setAddress(updateCustomer.getAddress());
        customerService.save(customer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/lock/{id}")
    public ResponseEntity<?> ChangeLock(@PathVariable Long id, @RequestBody LockStatusReqDTO lockStatusReqDTO){
        User user= userService.findById(lockStatusReqDTO.getUserId()).get();
        user.setUnlock(false);
        userService.save(user);
        Customer customer = customerService.findById(id).get();
        customer.setUser(user);
        customerService.save(customer);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
