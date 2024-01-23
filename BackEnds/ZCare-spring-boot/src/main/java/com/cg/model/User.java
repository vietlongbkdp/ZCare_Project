package com.cg.model;

import com.cg.model.enumeration.ELockStatus;
import com.cg.model.enumeration.ERole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String code;
    @Enumerated(EnumType.STRING)
    private ERole role;
    @Column(name="un_lock")
    private boolean unlock;
}
