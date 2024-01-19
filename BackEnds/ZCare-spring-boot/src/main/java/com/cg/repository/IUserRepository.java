package com.cg.repository;

import com.cg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User>  findByEmail(String email);

//    Optional<User> findByEmail(String email);
}
