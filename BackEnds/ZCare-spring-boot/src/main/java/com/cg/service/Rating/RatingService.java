package com.cg.service.Rating;

import com.cg.model.Customer;
import com.cg.model.DTO.RatingReqDTO;
import com.cg.model.Doctor;
import com.cg.model.Rating;
import com.cg.repository.IRatingRepository;
import com.cg.service.Customer.CustomerService;
import com.cg.service.doctor.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class RatingService implements IRatingService{
    @Autowired
    private IRatingRepository iRatingRepository;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private DoctorServiceImpl doctorService;

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
    public void createRating(RatingReqDTO ratingReqDTO) {
        Doctor doctor = doctorService.findById(1L).get();
        Customer customer = customerService.findById(1L).get();
        int star = Integer.parseInt(ratingReqDTO.getStar());
        String comment = ratingReqDTO.getComment();
        Rating rating = new Rating();
        rating.setStar(star);
        rating.setComment(comment);
        rating.setDoctor(doctor);
        rating.setCustomer(customer);
        iRatingRepository.save(rating);
    }
}
