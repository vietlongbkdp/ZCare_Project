package com.cg.service.Rating;

import com.cg.model.Booking;
import com.cg.model.Customer;
import com.cg.model.DTO.RatingReqDTO;
import com.cg.model.Doctor;
import com.cg.model.Rating;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.repository.IRatingRepository;
import com.cg.service.Customer.CustomerService;
import com.cg.service.booking.BookingService;
import com.cg.service.doctor.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RatingService implements IRatingService {
    @Autowired
    private IRatingRepository iRatingRepository;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private DoctorServiceImpl doctorService;
    @Autowired
    private BookingService bookingService;

    @Override
    public List<Rating> findAll() {
        return iRatingRepository.findAll();
    }

    @Override
    public Optional<Rating> findById(Long id) {
        return iRatingRepository.findById(id);
    }

    @Override
    public void save(Rating rating) {
        iRatingRepository.save(rating);
    }

    @Override
    public void deleteById(Long id) {
        iRatingRepository.deleteById(id);
    }

    @Override
    public boolean createRating(RatingReqDTO ratingReqDTO, Long doctorId, Long userId) {
        Doctor doctor = doctorService.findById(doctorId).get();
        Customer customer = customerService.findByUser_Id(userId);
        int star = Integer.parseInt(ratingReqDTO.getStar());
        List<Booking> bookingList = bookingService.findByCustomerIdAndDoctorIdAndStatus(customer.getId(), doctor.getId(), EStatusBooking.PAID);
        if (bookingList.isEmpty()) {
            throw new RuntimeException("Bạn chưa đặt lịch, vui lòng đặt lịch trước khi đánh giá.");
        }
        for (Booking booking : bookingList) {
            if (!booking.getRated()) {
                String comment = ratingReqDTO.getComment();
                Rating rating = new Rating();
                rating.setStar(star);
                rating.setComment(comment);
                rating.setDoctor(doctor);
                rating.setCustomer(customer);
                rating.setCreateAt(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                iRatingRepository.save(rating);
                booking.setRated(true);
                bookingService.save(booking);

                List<Rating> ratingList = findByDoctorId(doctorId);
                Float avg_star = 0.0F;
                for (Rating item : ratingList) {
                    avg_star += item.getStar();
                }
                Float avg = avg_star / ratingList.size();
                doctor.setStar(avg);
                doctorService.save(doctor);

                return true;
            }
        }
        throw new RuntimeException("Bạn đã đánh giá bác sĩ này trước đó, không được đánh giá lại.");
    }

    @Override
    public List<Rating> findByDoctorId(Long doctorId) {
        return iRatingRepository.findByDoctorId(doctorId);
    }
}
