package com.cg.controller.api;

import com.cg.model.Customer;
import com.cg.model.DTO.*;
import com.cg.model.User;
import com.cg.repository.IUserRepository;
import com.cg.security.careUser.CareUserDetails;
import com.cg.security.jwt.JwtUtils;
import com.cg.service.Customer.CustomerService;
import com.cg.service.User.UserService;
import com.cg.util.PasswordEncryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerAPI {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
@Autowired
private UserService userService;
    @GetMapping
    public ResponseEntity<?> getAll(){
        List<Customer> customerList=customerService.findAll();
        return new ResponseEntity<>(customerList,HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<?>Login(@RequestBody LoginDTO loginDTO){
        Authentication authentication = authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtTokenForUser(authentication);
        CareUserDetails userDetails = (CareUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();

        JwtResponse jwtResponse = new JwtResponse(
                    userDetails.getId(),
                    userDetails.getEmail(),
                    jwt,
                    roles);
        ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
				.httpOnly(false)
                .secure(false)
                .sameSite("None")
				.path("/")
				.maxAge(60 * 1000)
				.domain(".localhost")
				.build();

        return ResponseEntity
				.ok()
				.header(HttpHeaders.SET_COOKIE, springCookie.toString())
				.body(jwtResponse);
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
    @PostMapping("forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPassword forgotPassword){
        boolean isConfirmed= customerService.forgotPassword(forgotPassword);
        if (isConfirmed) {
            User user = iUserRepository.findByEmail(forgotPassword.getEmail()).get();
            Long userId=user.getId();
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mã xác nhân không đúng");
        }
    }
    @PostMapping("change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword changePassword){
        User user = iUserRepository.findById(changePassword.getUserId()).get();
        user.setPassword(PasswordEncryptionUtil.encryptPassword(changePassword.getPassword()));
        iUserRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
