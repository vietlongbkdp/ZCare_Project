package com.cg.model;
import com.cg.model.enumeration.ELockStatus;
import com.cg.model.DTO.DoctorResDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "doctors")
@Accessors(chain = true)
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Tên bác sỹ không được trống")
    @Column(name = "doctor_name")
    private String doctorName;
    @ManyToOne
    private Position position;
    private LocalDate dob;
    @Column(unique = true)
    private String email;
    private String phone;
    @Column(name = "create_at")
    private LocalDate createAt;
    private BigDecimal fee;
    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;
    @Column(name = "avatar_img")
    private String avatarImg;
    @Column(columnDefinition = "decimal(2,1) default 0.0")
    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "5.0")
    private Float star;
    @Column(name = "doctor_info", columnDefinition = "LONGTEXT")
    private String doctorInfo;
    @ManyToOne
    private Speciality speciality;
    @OneToMany
    @JsonIgnore
    private List<Schedule> scheduleList;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
    @Enumerated(EnumType.STRING)
    private ELockStatus lockStatus;

    public DoctorResDTO toDoctorResDTO() {
        return new DoctorResDTO()
                .setDoctorName(doctorName)
                .setPosition(position)
                .setDob(dob)
                .setEmail(email)
                .setPhone(phone)
                .setCreateAt(createAt)
                .setFee(fee)
                .setClinic(clinic)
                .setAvatarImg(avatarImg)
                .setStar(star)
                .setDoctorInfo(doctorInfo)
                .setSpeciality(speciality)
                .setScheduleList(scheduleList)
                ;
    }
}
