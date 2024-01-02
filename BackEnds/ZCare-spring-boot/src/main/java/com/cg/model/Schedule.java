package com.cg.model;

import com.cg.model.enumeration.EStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date dateSchedule;
    private LocalDateTime timeSchedule;
    @Enumerated(EnumType.STRING)
    private EStatus status;
    @ManyToOne
    private Doctor doctor;
}
