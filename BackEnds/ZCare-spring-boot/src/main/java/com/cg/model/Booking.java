package com.cg.model;

import com.cg.model.enumeration.EStatusBooking;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="bookings")
@Accessors(chain = true)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Doctor doctor;
    @ManyToOne
    private Customer customer;
    private String bookingDate;
    private String bookingTime;
    @ManyToOne
    private Schedule schedule;
    private BigDecimal fee;
    @OneToOne
    private Result result;
    @Enumerated(EnumType.STRING)
    private EStatusBooking status;
    private LocalDateTime createAt;
    private String patientName;
    private String reason;

}

