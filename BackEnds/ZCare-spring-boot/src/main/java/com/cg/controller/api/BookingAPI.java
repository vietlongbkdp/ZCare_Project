package com.cg.controller.api;

import com.cg.model.Booking;
import com.cg.service.Booking.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "*")
public class BookingAPI {
    @Autowired
    private BookingService bookingService;

    @GetMapping("{CustomerId}")
    public ResponseEntity<?> getAllBookingById(@PathVariable Long CustomerId){
        List<Booking> booking=bookingService.findAllByCustomerId(CustomerId);
        return new ResponseEntity<>(booking,HttpStatus.OK);
    }
}
