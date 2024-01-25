package com.cg.controller.api;

import com.cg.model.Booking;
import com.cg.model.DTO.BookingDTO;
import com.cg.service.booking.IBookingService;
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
    private IBookingService bookingService;
    @GetMapping
    public ResponseEntity<?> getAllBooking(){
        List<Booking> bookingList = bookingService.findAll();
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO){
        Booking booking = bookingService.toBooking(bookingDTO);
        bookingService.createBooking(booking);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
