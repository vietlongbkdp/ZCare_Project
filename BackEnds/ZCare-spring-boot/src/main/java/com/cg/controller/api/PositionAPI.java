package com.cg.controller.api;

import com.cg.model.Position;
import com.cg.service.position.IPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/{id}")
    public ResponseEntity<?> getPositionID(@PathVariable Long id){
        Position position = positionService.findById(id).get();
        return new ResponseEntity<>(position, HttpStatus.OK);
    }
}
