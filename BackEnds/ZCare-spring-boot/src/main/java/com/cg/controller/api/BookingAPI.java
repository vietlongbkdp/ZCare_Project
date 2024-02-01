package com.cg.controller.api;

import com.cg.model.*;
import com.cg.model.Booking;
import com.cg.model.DTO.BookingAdminDTO;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.DTO.ChangeStatusDTO;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.model.enumeration.EWeekday;
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
import java.util.ArrayList;
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

    @GetMapping("{clinicId}/{customerId}")
    public ResponseEntity<?> getAllBookingByClinicId(@PathVariable Long clinicId, @PathVariable Long customerId) {
        List<Booking> bookingList = bookingService.getAllBookingByClinicIdAndCustomerId(clinicId, customerId);
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }

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
        List<Booking> bookings = new ArrayList<>();
        for(Booking booking: bookingList){
            if(booking.getStatus()== EStatusBooking.PAID){
                bookings.add(booking);
            }
        }
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/doctor/{userId}")
    public ResponseEntity<?> getAllBookingByDoctorId(@PathVariable Long userId) {
        Doctor doctor = doctorService.findByUser_Id(userId);
        List<Booking> bookingList = bookingService.findAllByDoctorId(doctor.getId());
        List<Booking> bookings1 = new ArrayList<>();
        for(Booking booking: bookingList){
            if(booking.getStatus()== EStatusBooking.PAID){
                bookings1.add(booking);
            }
        }
        return new ResponseEntity<>(bookings1, HttpStatus.OK);
    }

    @GetMapping("/{userId}/{date}/{month}/{year}")
    public ResponseEntity<?> getAllBookingByClinicIdAndBookingDate(@PathVariable Long userId, @PathVariable String date, @PathVariable String month, @PathVariable String year) {
        Clinic clinic = clinicService.findByUser_Id(userId);
        String bookingDate = String.format("%02d/%d/%04d", Integer.parseInt(date), Integer.parseInt(month), Integer.parseInt(year));
        List<Booking> bookingList = bookingService.findByClinicIdAndBookingDate(clinic.getId(), bookingDate);
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
    @GetMapping("/{clinicId}/{weekday}")
    public ResponseEntity<?> getAllBookingByClinicId(@PathVariable Long clinicId, @PathVariable String weekday) {
        EWeekday weekdayEnum = EWeekday.getDayById(weekday);
        List<Booking> bookingList = bookingService.findByClinicIdAndBookingDate(clinicId, weekday);
        return new ResponseEntity<>(bookingList, HttpStatus.OK);
    }
}
