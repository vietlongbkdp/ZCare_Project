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
        return iBooKingRepository.findAllByCustomerId(customerId);
    }
}
