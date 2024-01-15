package com.cg.service;

import com.cg.model.Clinic;

import java.util.List;
import java.util.Optional;

public interface IGeneralService <E, T>{
    List<E> findAll();

    Optional<E> findById(T id);

    void save(E e);

    void deleteById(T id);
}
