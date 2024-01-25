package com.cg.model;

import com.cg.model.enumeration.EGender;
import com.cg.model.enumeration.ELockStatus;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @NotEmpty(message = "Tên không được trống")
    private String fullName;
    private LocalDate dob;
    @NotEmpty(message = "Số điện thoại không được trống")
    private String phone;
    @NotEmpty(message = "email không được trống")
    @Column(unique = true)
    private String email;
    @NotEmpty(message = "Địa chỉ không được để trống")
    private String address;
    @Enumerated(EnumType.STRING)
    private EGender gender;
    @Valid
    @NotNull(message = "Khách hàng không được null")
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

}
