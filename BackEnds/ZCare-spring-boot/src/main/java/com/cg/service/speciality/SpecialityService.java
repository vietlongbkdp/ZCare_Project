package com.cg.service.speciality;

import com.cg.model.Clinic;
import com.cg.model.Speciality;
import com.cg.repository.ISpecialityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class SpecialityService implements ISpecialityService {
    @Autowired
    private ISpecialityRepository specialityRepository;
    @Override
    public List<Speciality> findAll() {
        return specialityRepository.findAll();
    }

    @Override
    public Optional<Speciality> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Clinic save(Speciality speciality) {

        return null;
    }

    @Override
    public void deleteById(Long id) {

    }
}
