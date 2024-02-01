package com.cg.service.medicine;

import com.cg.model.Medicine;
import com.cg.repository.IMedicineRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class MedicineService implements IMedicineService{
    @Autowired
    private IMedicineRepository medicineRepository;
    @Override
    public List<Medicine> findAll() {
        return medicineRepository.findAll();
    }

    @Override
    public Optional<Medicine> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Medicine medicine) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
