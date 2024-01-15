package com.cg.service.Cooperate;

import com.cg.model.Clinic;
import com.cg.model.Cooperate;
import com.cg.repository.ICooperateRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CooperateService implements ICooperateService{
    @Autowired
    private ICooperateRepository iCooperateRepository;

    @Override
    public List<Cooperate> findAll() {
        return iCooperateRepository.findAll();
    }

    @Override
    public Optional<Cooperate> findById(Long id) {
        return iCooperateRepository.findById(id);
    }

    @Override
    public void save(Cooperate cooperate) {
        iCooperateRepository.save(cooperate);

    }

    @Override
    public void deleteById(Long id) {
        iCooperateRepository.deleteById(id);
    }
}
