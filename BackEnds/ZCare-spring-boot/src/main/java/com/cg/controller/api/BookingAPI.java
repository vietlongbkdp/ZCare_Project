package com.cg.controller.api;
import com.cg.model.Booking;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.Customer;
import com.cg.service.Customer.CustomerService;
import com.cg.service.booking.BookingService;
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
    @Autowired
    private CustomerService customerService;
    @GetMapping
    public ResponseEntity<?> getAllBooking(){
        List<Booking> bookingList = bookingService.findAll();
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO) {
        Booking booking = bookingService.toBooking(bookingDTO);
        bookingService.createBooking(booking);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("{userId}")
    public ResponseEntity<?> getAllBookingByCustomerId(@PathVariable Long userId){
        Customer customer=customerService.findByUser_Id(userId);
        List<Booking> booking=bookingService.findAllByCustomerId(customer.getId());
        return new ResponseEntity<>(booking,HttpStatus.OK);
    }

}
