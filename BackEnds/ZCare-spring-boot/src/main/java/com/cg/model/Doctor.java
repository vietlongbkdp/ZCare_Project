package com.cg.model;

import com.cg.model.enumeration.ELockStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="doctors")
@Accessors(chain = true)
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "doctor_name")
    private String doctorName;
    @ManyToOne
    private Position position;
    private Date dob;
    private String email;
    private String phone;
    @Column(name = "create_at")
    private LocalDate createAt;
    private BigDecimal fee;
    @ManyToOne
    @JoinColumn(name="clinic_id")
    private Clinic clinic;
    @Column(name = "avatar_img")
    private String avatarImg;
    @Column(columnDefinition = "integer default 0")
    private Integer star;
    @Column(name = "doctor_info")
    private String doctorInfo;
    @ManyToOne
    private Speciality speciality;

    @Enumerated(EnumType.STRING)
    private ELockStatus lockStatus;

}
