package com.cg.controller.api;

import com.cg.model.Cooperate;
import com.cg.model.DTO.CooperateReqDTO;
import com.cg.model.enumeration.EStatus;
import com.cg.service.Cooperate.ICooperateService;
import com.cg.until.EmailUntil;
import com.cg.until.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/cooperate")
@CrossOrigin(origins = "*")
public class CooperateAPI {
    @Autowired
    private ICooperateService cooperateService;

    @Autowired
    private EmailUntil emailUntil;

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Cooperate> cooperates = cooperateService.findAll();
        return new ResponseEntity<>(cooperates, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createCooperate(@RequestBody CooperateReqDTO cooperateReqDTO) {
        cooperateService.save(cooperateReqDTO.toCooperate());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> sendMailSuccess(@PathVariable Long id) {
        Cooperate cooperate = cooperateService.findById(id).get();
        cooperate.setStatus(EStatus.SELECTED);
        cooperateService.save(cooperate);
        String email = cooperate.getEmail();
        String name = cooperate.getFullName();
        String title="Xác nhận hợp tác thành công";
        String body= SendEmail.EmailCooperate(name);
        emailUntil.sendEmail(email,title,body);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
