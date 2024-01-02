package com.cg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String doctorName;
    private String position;
    private Date dob;
    private String email;
    private String phone;
    private String doctorInfor;

    @OneToOne
    @JoinColumn(name="clinic_id")
    private Clinic clinic;

    private String avatarImg;

    @ManyToOne
    private Speciality speciality;

}
