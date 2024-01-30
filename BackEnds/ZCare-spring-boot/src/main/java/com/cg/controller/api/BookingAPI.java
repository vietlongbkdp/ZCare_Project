package com.cg.controller.api;
import com.cg.model.*;
import com.cg.model.Booking;
import com.cg.model.DTO.BookingAdminDTO;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.service.Customer.CustomerService;
import com.cg.service.booking.BookingService;
import com.cg.service.clinic.IClinicService;
import com.cg.service.doctor.IDoctorService;
import com.cg.service.schedule.IScheduleService;
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
    @Autowired
    private IScheduleService scheduleService;
    @Autowired
    private IClinicService clinicService;
    @Autowired
    private IDoctorService doctorService;
    @GetMapping
    public ResponseEntity<?> getAllBooking(){
        List<Booking> bookingList = bookingService.findAll();
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }

    @GetMapping ("/confirm/{customerId}/{scheduleId}")
    public ResponseEntity<?> confirmBooking(@PathVariable Long customerId,@PathVariable Long scheduleId){
        Booking booking = bookingService.findByCustomerIdAndScheduleId(customerId,scheduleId);
        booking.setStatus(EStatusBooking.CUSTOMERCONFIMED);
        bookingService.save(booking);
        return new ResponseEntity<>("Xác nhận booking thành công", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO) {
        Schedule schedule = scheduleService.findById(bookingDTO.getScheduleId()).get();
        if(schedule.getStatus() == EStatus.AVAILABLE){
            bookingService.createBooking(bookingDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<?> createBookingAdmin(@RequestBody BookingAdminDTO bookingAdminDTO) {
        Schedule schedule = scheduleService.findById(bookingAdminDTO.getScheduleId()).get();
        if(schedule.getStatus() == EStatus.AVAILABLE){
            bookingService.createBookingAdmin(bookingAdminDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getAllBookingByCustomerId(@PathVariable Long userId){
        Customer customer=customerService.findByUser_Id(userId);
        List<Booking> booking=bookingService.findAllByCustomerId(customer.getId());
        return new ResponseEntity<>(booking,HttpStatus.OK);
    }
    @GetMapping("/adminclinic/{userId}")
    public ResponseEntity<?> GetAlllBookingbyClinicId(@PathVariable Long userId){
        Clinic clinic = clinicService.findByUser_Id(userId);
        List<Doctor> doctorList = doctorService.findAllByClinic_Id(clinic.getId());
        for (Doctor doctor: doctorList){
            List<Booking> bookingList = bookingService.findAllByDoctor_Id(doctor.getId());
            return new ResponseEntity<>(bookingList ,HttpStatus.OK);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/doctor/{userId}")
    public ResponseEntity<?> GetAllBookingbyDoctorId(@PathVariable Long userId){
        Doctor doctor = doctorService.findByUser_Id(userId);
        List<Booking> bookingList = bookingService.findAllByDoctor_Id(doctor.getId());
        return new ResponseEntity<>(bookingList,HttpStatus.OK);
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendReminderEmails() {
        bookingService.checkBookingDatesAndSendReminderEmails();
        return ResponseEntity.ok("Reminder emails sent successfully.");
    }

}
