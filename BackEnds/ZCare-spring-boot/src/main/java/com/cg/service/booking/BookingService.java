package com.cg.service.Booking;

import com.cg.model.Booking;
import com.cg.repository.IBooKingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class BookingService implements IBookingService{
    @Autowired
    private IBooKingRepository iBooKingRepository;
    @Override
    public List<Booking> findAll() {
        return iBooKingRepository.findAll();
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return iBooKingRepository.findById(id);
    }

    @Override
    public void save(Booking booking) {
        iBooKingRepository.save(booking);
    }

    @Override
    public void deleteById(Long id) {
        iBooKingRepository.deleteById(id);
    }

    @Override
    public List<Booking> findAllByCustomerId(Long customerId) {
<<<<<<< HEAD
        return iBooKingRepository.findAllByCustomerId(customerId);
=======
        return bookingRepository.findAllByCustomerId(customerId);
    }
    public Booking toBooking(BookingDTO bookingDTO){
        Schedule schedule = scheduleService.findById(bookingDTO.getScheduleId()).get();
        Customer customer = customerService.findById(bookingDTO.getIdCustomer()).get();
        Booking booking = new Booking().setDoctor(schedule.getDoctor()).setCustomer(customer).setSchedule(schedule)
                .setBookingDate(bookingDTO.getBookDay()).setBookingTime(schedule.getTimeItem()).setFee(schedule.getDoctor().getFee())
                .setCreateAt(LocalDateTime.now())
                .setStatus(EStatusBooking.CONFIRMING);
        if(bookingDTO.getReason() != null){
            booking.setReason(bookingDTO.getReason());
        }
        if(bookingDTO.getPatientName() == ""){
            booking.setPatientName(customer.getFullName());
        }else{
            booking.setPatientName(bookingDTO.getPatientName());
        }
        return booking;
    }
    public void createBooking(Booking booking) {
        bookingRepository.save(booking);
>>>>>>> 6d661d1a2091d1c959f236e918bcc88ff52db931
    }
}
