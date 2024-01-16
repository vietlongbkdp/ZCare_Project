package com.cg.model;

import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Enumerated(EnumType.STRING)
    private EWeekday weekday;
    private String timeItem;
    @Enumerated(EnumType.STRING)
    private EStatus status;
    @ManyToOne
    private Doctor doctor;
}
