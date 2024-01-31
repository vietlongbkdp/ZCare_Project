package com.cg.controller.api;

import com.cg.model.*;
import com.cg.model.Booking;
import com.cg.model.DTO.BookingAdminDTO;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.DTO.ChangeStatusDTO;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.repository.IBookingRepository;
import com.cg.service.Customer.CustomerService;
import com.cg.service.booking.BookingService;
import com.cg.service.clinic.IClinicService;
import com.cg.service.doctor.IDoctorService;
import com.cg.service.schedule.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    @Autowired
    private IBookingRepository iBookingRepository;

    @GetMapping
    public ResponseEntity<?> getAllBooking() {
        List<Booking> bookingList = bookingService.findAll();
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }

    @GetMapping("/confirm/{customerId}/{scheduleId}")
    public ResponseEntity<?> confirmBooking(@PathVariable Long customerId, @PathVariable Long scheduleId) {
        Booking booking = bookingService.findByCustomerIdAndScheduleId(customerId, scheduleId);
        String redirectUrl;
        if (booking == null) {
            String toastErrorMessage = "Lịch khám của bạn đã hết hạn, vui lòng đặt lại!";
            redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:3001/appointment-schedule")
                    .queryParam("toastErrorMessage", toastErrorMessage)
                    .toUriString();
        } else {
            booking.setStatus(EStatusBooking.CUSTOMERCONFIMED);
            bookingService.save(booking);
            String toastSuccessMessage = "Xác nhận đặt lịch thành công!";
            redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:3001/appointment-schedule")
                    .queryParam("toastSuccessMessage", toastSuccessMessage)
                    .toUriString();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(redirectUrl));

        return ResponseEntity.status(HttpStatus.FOUND).headers(headers).build();
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO) {
        Schedule schedule = scheduleService.findById(bookingDTO.getScheduleId()).get();
        if (schedule.getStatus() == EStatus.AVAILABLE) {
            bookingService.createBooking(bookingDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/admin")
    public ResponseEntity<?> createBookingAdmin(@RequestBody BookingAdminDTO bookingAdminDTO) {
        Schedule schedule = scheduleService.findById(bookingAdminDTO.getScheduleId()).get();
        if (schedule.getStatus() == EStatus.AVAILABLE) {
            bookingService.createBookingAdmin(bookingAdminDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getAllBookingByCustomerId(@PathVariable Long userId) {
        Customer customer = customerService.findByUser_Id(userId);
        List<Booking> booking = bookingService.findAllByCustomerId(customer.getId());
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

//    @GetMapping("{clinicId}")
//    public ResponseEntity<?> getAllBookingByClinicId(@PathVariable Long clinicId) {
//        List<Booking> bookingList = bookingService.getAllBookingByClinicId(clinicId);
//        return new ResponseEntity<>(bookingList, HttpStatus.OK);
//    }

    @GetMapping("bookingDate")
    public ResponseEntity<?> getAllBookingByBookingDate() {
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/M/yyyy"));
        List<Booking> bookings = iBookingRepository.findByBookingDate(currentDate);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/adminClinic/{userId}")
    public ResponseEntity<?> getAllBookingByUserId(@PathVariable Long userId) {
        Clinic clinic = clinicService.findByUser_Id(userId);
        List<Booking> bookingList = bookingService.getAllBookingByClinicId(clinic.getId());
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }

    @GetMapping("/doctor/{userId}")
    public ResponseEntity<?> GetAllBookingbyDoctorId(@PathVariable Long userId) {
        Doctor doctor = doctorService.findByUser_Id(userId);
        List<Booking> bookingList = bookingService.findAllByDoctor_Id(doctor.getId());
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendReminderEmails() {
        bookingService.checkBookingDatesAndSendReminderEmails();
        return ResponseEntity.ok("Reminder emails sent successfully.");
    }

    @PostMapping("/setSchedule")
    public ResponseEntity<String> setScheduleBooking() {
        bookingService.setSchedule();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/changeStatus")
    public ResponseEntity<String> changeStatus(@RequestBody ChangeStatusDTO changeStatusDTO) {
        Booking booking =bookingService.findById(changeStatusDTO.getBookingId()).get();
        booking.setStatus(EStatusBooking.valueOf(changeStatusDTO.getSelectedStatus()));
        bookingService.save(booking);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
