package com.cg.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="clinics")
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "clinic_name")
    private String clinicName;
    @Column(name = "legal_representative")
    private String legalRepresentative;
    private String email;
    private String hotline;
    @Column(name = "operating_licence")
    private String operatingLicence;
    private String address;
    @Column(name = "clinic_info", columnDefinition = "LONGTEXT")
    private String clinicInfo;
    @Column(name = "clinic_logo")
    private String clinicLogo;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
}