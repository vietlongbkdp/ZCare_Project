package com.cg.controller.api;
import com.cg.model.Cooperate;
import com.cg.model.DTO.CooperateReqDTO;
import com.cg.service.Cooperate.ICooperateService;
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

    @GetMapping
    public ResponseEntity<?> findAll() {
        List<Cooperate> cooperates =  cooperateService.findAll();
        return new ResponseEntity<>(cooperates,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createCooperate(@RequestBody CooperateReqDTO cooperateReqDTO) {
        cooperateService.save(cooperateReqDTO.toCooperate());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
