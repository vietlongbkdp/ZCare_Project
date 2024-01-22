package com.cg.model;

import com.cg.model.DTO.ScheduleRespDTO;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import jakarta.persistence.*;
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
@Table(name = "schedules")
@Accessors(chain = true)
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
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    public ScheduleRespDTO toScheduleRespDTO(){
        return new ScheduleRespDTO().setWeekday(weekday.getWeekday()).setIdDoctor(doctor.getId()).setTimeItem(timeItem);
    }
}
