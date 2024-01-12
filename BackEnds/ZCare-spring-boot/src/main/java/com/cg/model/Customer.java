package com.cg.model;

import com.cg.model.enumeration.EGender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Date dob;
    private String phone;
    private String email;
    private String address;
    @Enumerated(EnumType.STRING)
    private EGender gender;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

}
