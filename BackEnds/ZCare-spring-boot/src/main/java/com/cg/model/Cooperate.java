package com.cg.model;

import com.cg.model.DTO.CooperateReqDTO;
import com.cg.model.enumeration.EStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Cooperates")
@Accessors(chain = true)
public class Cooperate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Tên không được để trống")
    private String fullName;
    @NotEmpty(message = "Số điện thoại không được để trống")
    private String phone;
    @Email
    @NotEmpty(message = "email không được để trống")
    private String email;
    @NotEmpty(message = "Tên phòng khám không được để trống")
    private String clinicName;
    @NotEmpty(message = "Địa chỉ không được để trống")
    private String address;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    @Enumerated(EnumType.STRING)
    private EStatus status;
}
