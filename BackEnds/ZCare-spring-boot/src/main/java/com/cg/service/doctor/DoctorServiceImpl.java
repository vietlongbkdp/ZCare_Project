package com.cg.service.doctor;

import com.cg.model.Doctor;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorServiceImpl implements IDoctorService{
    @Override
    public List<Doctor> findAll() {
        return null;
    }

    @Override
    public Optional<Doctor> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Doctor doctor) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
