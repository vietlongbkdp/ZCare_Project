package com.cg.controller.api;

import com.cg.model.Customer;
import com.cg.model.DTO.CustomerReqDTO;
import com.cg.model.DTO.EmailReqDTO;
import com.cg.model.DTO.ForgotPassword;
import com.cg.model.DTO.LoginDTO;
import com.cg.model.User;
import com.cg.service.Customer.CustomerService;
import com.cg.service.User.UserService;
import com.cg.until.PasswordEncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/customer")
@CrossOrigin(origins = "*")
public class CustomerAPI {
    @Autowired
    private CustomerService customerService;
@Autowired
private UserService userService;
    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Customer> customerList=customerService.findAll();
        return new ResponseEntity<>(customerList,HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<?>Login(@RequestBody LoginDTO loginDTO){
        String email=loginDTO.getEmail();
        String password=loginDTO.getPassword();
        User user =  userService.findByFullName(email);
        if(user !=null && PasswordEncryptionUtil.checkPassword(password,user.getPassword())){
            return ResponseEntity.ok("Đăng nhập thành công!");
        }else {
            String errorMessage = "Thông tin đăng nhập không đúng!";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
        }
    }

    @PostMapping
    public ResponseEntity<?> Register(@RequestBody CustomerReqDTO customerReqDTO){
        customerService.register(customerReqDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("email")
    public ResponseEntity<?> senderEmail(@RequestBody EmailReqDTO emailReqDTO){
        boolean isConfirmed= customerService.confirmEmail(emailReqDTO);
        if (isConfirmed) {
            return ResponseEntity.ok("Gửi mail thành công");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("email không tồn tại");
        }
    }
    @PostMapping("forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPassword forgotPassword){
        boolean isConfirmed= customerService.forgotPassword(forgotPassword);
        if (isConfirmed) {
            return ResponseEntity.ok("Gửi xác nhận thành công");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mã xác nhân không đúng");
        }
    }

}
