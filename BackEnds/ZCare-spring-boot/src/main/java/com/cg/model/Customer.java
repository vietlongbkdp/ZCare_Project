package com.cg.model;

import com.cg.model.enumeration.EGender;
import com.cg.model.enumeration.ELockStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private LocalDate dob;
    private String phone;
    @Column(unique = true)
    private String email;
    private String address;
    @Enumerated(EnumType.STRING)
    private EGender gender;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

}
