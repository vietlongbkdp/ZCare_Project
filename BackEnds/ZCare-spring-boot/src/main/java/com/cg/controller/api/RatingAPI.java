package com.cg.controller.api;

import com.cg.model.DTO.RatingReqDTO;
import com.cg.model.Rating;
import com.cg.service.Rating.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{doctorId}")
    public ResponseEntity<?> getAllRatingByDoctorId(@PathVariable Long doctorId ){
      List<Rating> ratings= ratingService.findByDoctorId(doctorId);
        return new ResponseEntity<>(ratings,HttpStatus.OK);
    }

    @PostMapping("/create/{doctorId}")
    public ResponseEntity<?> createRating(@PathVariable Long doctorId,@RequestBody RatingReqDTO ratingReqDTO) {
        ratingService.createRating(ratingReqDTO,doctorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
