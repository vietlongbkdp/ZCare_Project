package com.cg.model;

import jakarta.persistence.*;
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

    @ManyToOne
    private Doctor doctor;

    @ManyToOne
    private Customer customer;

    private Date bookingDate;
    private LocalDateTime bookingTime;

    @ManyToOne
    private Schedule schedule;

    private BigDecimal fee;
    @ManyToOne
    private Result result;
    @ManyToOne
    private Status status;
    private LocalDateTime createAt;
    private String bookFor;
    private String reason;

}

