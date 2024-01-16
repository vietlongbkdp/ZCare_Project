package com.cg.repository;

import com.cg.model.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAvatarRepository extends JpaRepository<Avatar, String> {
    void deleteById(String id);
    void deleteByFileUrl(String fileUrl);
}
