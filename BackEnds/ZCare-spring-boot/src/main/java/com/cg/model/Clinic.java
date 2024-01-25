package com.cg.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @NotEmpty(message = "Tên phòng khám không được để trống")
    @Column(name = "clinic_name")
    private String clinicName;
    @NotEmpty(message = "Tên người đại diện không được để trống")
    @Column(name = "legal_representative")
    private String legalRepresentative;
    @Email
    @NotEmpty(message = "Email không được để trống")
    private String email;
    @NotEmpty(message = "Số điện thoại không được để trống")
    private String hotline;
    @NotEmpty(message = "Giấy phép hoạt động không được để trống không được để trống")
    @Column(name = "operating_licence")
    private String operatingLicence;
    @NotEmpty(message = "Địa chỉ không được để trống")
    private String address;
    @Column(name = "clinic_info", columnDefinition = "LONGTEXT")
    private String clinicInfo;
    @Column(name = "clinic_logo")
    private String clinicLogo;
    @Valid
    @NotNull
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
}