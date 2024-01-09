package com.cg.repository;

import com.cg.model.Cooperate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICooperateRepository extends JpaRepository<Cooperate, Long> {
}
