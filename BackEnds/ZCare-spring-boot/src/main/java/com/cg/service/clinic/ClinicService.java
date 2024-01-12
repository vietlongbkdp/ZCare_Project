package com.cg.service.clinic;

import com.cg.model.Clinic;
import com.cg.repository.IClinicRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClinicService implements IClinicService{
    @Autowired
    private IClinicRepository clinicRepository;
    @Override
    public List<Clinic> findAll() {
        return clinicRepository.findAll();
    }

    @Override
    public Optional<Clinic> findById(Long id) {
        return clinicRepository.findById(id);
    }

    @Override
    public Clinic save(Clinic clinic) {
         return clinicRepository.save(clinic);
    }

    @Override
    public void deleteById(Long id) {

    }
}
