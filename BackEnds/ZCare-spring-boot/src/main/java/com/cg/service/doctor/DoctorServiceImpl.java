package com.cg.service.doctor;

import com.cg.model.Clinic;
import com.cg.model.Doctor;
import com.cg.repository.IDoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorServiceImpl implements IDoctorService{
    @Autowired
    private IDoctorRepository iDoctorRepository;
    @Override
    public List<Doctor> findAll() {
        return iDoctorRepository.findAll();
    }

    @Override
    public Optional<Doctor> findById(Long id) {
        return iDoctorRepository.findById(id);
    }

    @Override
    public Clinic save(Doctor doctor) {

        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
