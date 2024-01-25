package com.cg.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="ratings")
@Accessors(chain = true)
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Số sao không được null")
    private Integer star;
    @NotEmpty(message = "Nhận xét không được trống")
    private String comment;
    @NotEmpty(message = "Ngày tạo không được trống")
    private String createAt;
    @Valid
    @NotNull(message = "Bác sĩ không được null")
    @ManyToOne
    private Doctor doctor;
    @Valid
    @NotNull(message = "Khách hàng không được null")
    @ManyToOne
    private Customer customer;
}
