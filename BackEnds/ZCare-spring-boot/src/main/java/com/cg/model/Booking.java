package com.cg.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Valid
    @NotNull(message = "Bác sĩ không được để trống")
    @ManyToOne
    private Doctor doctor;
    @Valid
    @NotNull(message = "Bệnh nhân không được để trống")
    @ManyToOne
    private Customer customer;

    private Date bookingDate;
    private LocalDateTime bookingTime;

    @ManyToOne
    private Schedule schedule;

    private BigDecimal fee;
    @OneToOne
    private Result result;
    @ManyToOne
    private Status status;
    private LocalDateTime createAt;
    private String bookFor;
    private String reason;

}

