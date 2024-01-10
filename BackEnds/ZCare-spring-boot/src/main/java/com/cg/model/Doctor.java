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

    @ManyToOne
    private Position position;

    private Date dob;
    private String email;
    private String phone;
    private String doctorInfor;
    private Date createAT;

    @ManyToOne
    @JoinColumn(name="clinic_id")
    private Clinic clinic;

    private String avatarImg;
    @Column(columnDefinition = "integer default 0")
    private Integer star;

    @ManyToOne
    private Speciality speciality;

}
