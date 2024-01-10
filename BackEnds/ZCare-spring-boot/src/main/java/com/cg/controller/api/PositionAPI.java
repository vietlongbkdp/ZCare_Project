package com.cg.controller.api;

import com.cg.model.Position;
import com.cg.service.position.IPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/position")
@CrossOrigin(origins = "*")
public class PositionAPI {
    @Autowired
    private IPositionService positionService;
    @GetMapping
    public ResponseEntity<?> getAllPosition(){
        List<Position> listPosition = positionService.findAll();
        return new ResponseEntity<>(listPosition, HttpStatus.OK);
    }
}
