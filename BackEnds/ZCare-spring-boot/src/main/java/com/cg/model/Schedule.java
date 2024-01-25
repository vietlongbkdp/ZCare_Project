package com.cg.model;

import com.cg.model.DTO.ScheduleRespDTO;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "Ngày trong tuần không được null")
    @Enumerated(EnumType.STRING)
    private EWeekday weekday;
    @NotEmpty(message = "Thời gian không được trống")
    private String timeItem;
    @NotNull(message = "Trạng thái không được null")
    @Enumerated(EnumType.STRING)
    private EStatus status;
    @Valid
    @NotNull(message = "Doctor không được null")
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;


    public ScheduleRespDTO toScheduleRespDTO(){
        return new ScheduleRespDTO()
                .setWeekday(weekday.getWeekday())
                .setIdDoctor(doctor.getId())
                .setTimeItem(timeItem);
    }
}
