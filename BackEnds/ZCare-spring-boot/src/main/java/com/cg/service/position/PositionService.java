package com.cg.service.position;

import com.cg.model.Position;
import com.cg.repository.IPositionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class PositionService implements IPositionService{
    @Autowired
    private IPositionRepository positionRepository;
    @Override
    public List<Position> findAll() {
        return positionRepository.findAll();
    }

    @Override
    public Optional<Position> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Position position) {

    }

    @Override
    public void deleteById(Long id) {

    }
}
