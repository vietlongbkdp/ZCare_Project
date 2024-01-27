package com.cg.service.booking;
import com.cg.model.Booking;
import com.cg.model.Customer;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EStatusBooking;

import com.cg.repository.IBookingRepository;
import com.cg.service.Customer.ICustomerService;
import com.cg.service.schedule.IScheduleService;
import com.cg.until.EmailUntil;
import com.cg.until.SendEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class BookingService implements IBookingService {
    @Autowired
    private IBookingRepository iBookingRepository;
    @Autowired
    private IScheduleService scheduleService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private EmailUntil emailUntil;
    @Override
    public List<Booking> findAll() {
        return iBookingRepository.findAll();
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return iBookingRepository.findById(id);
    }

    @Override
    public void save(Booking booking) {
        iBookingRepository.save(booking);
    }

    @Override
    public void deleteById(Long id) {
        iBookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> findAllByCustomerId(Long customerId) {
        return iBookingRepository.findAllByCustomerId(customerId);
    }

    @Override
    public Booking findByCustomerIdAndScheduleId(Long customerId, Long scheduleId) {
        return iBookingRepository.findByCustomerIdAndScheduleId(customerId,scheduleId);
    }


    public Booking toBooking(BookingDTO bookingDTO){
        Schedule schedule = scheduleService.findById(bookingDTO.getScheduleId()).get();
        schedule.setStatus(EStatus.SELECTED);
        Customer customer = customerService.findByUser_Id(bookingDTO.getUserId());
        Booking booking = new Booking().setDoctor(schedule.getDoctor()).setCustomer(customer).setSchedule(schedule)
                .setBookingDate(bookingDTO.getBookDay()).setBookingTime(schedule.getTimeItem()).setFee(schedule.getDoctor().getFee())
                .setCreateAt(LocalDate.now())
                .setStatus(EStatusBooking.CONFIRMING);
        if(bookingDTO.getReason() != null){
            booking.setReason(bookingDTO.getReason());
        }
        if(bookingDTO.getPatientName() == null){
            booking.setPatientName(customer.getFullName());
        }else{
            booking.setPatientName(bookingDTO.getPatientName());
        }
        return booking;
    }
    public void createBooking(Booking booking) {
        Schedule schedule = scheduleService.findById(booking.getSchedule().getId()).get();
        if(schedule.getStatus()== EStatus.SELECTED){
            return ;
        }
        iBookingRepository.save(booking);
        String url = "http://localhost:8080/api/booking/confirm/" + booking.getCustomer().getId() + "/" + booking.getSchedule().getId();
        String title="Xác nhận đặt lịch hẹn khám tại ZCare";
        String body= SendEmail.EmailScheduledSuccessfully(
                booking.getCustomer().getFullName(),booking.getBookingDate(),schedule.getTimeItem(),url);
        emailUntil.sendEmail( booking.getCustomer().getEmail(),title,body);
    }
}
