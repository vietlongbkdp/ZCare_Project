package com.cg.controller.api;

import com.cg.model.DTO.RatingReqDTO;
import com.cg.service.Rating.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/rating")
@CrossOrigin(origins = "*")
public class RatingAPI {
    @Autowired
    private RatingService ratingService;

    @GetMapping
    public ResponseEntity<?> getAllRating(){
        ratingService.findAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity<?> createRating(@RequestBody RatingReqDTO ratingReqDTO) {
        ratingService.createRating(ratingReqDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
