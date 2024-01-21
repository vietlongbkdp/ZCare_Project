package com.cg.service.schedule;

import com.cg.model.DTO.ScheduleDeleteDTO;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IScheduleService extends IGeneralService<Schedule, Long> {
    void create(Schedule newSchedule);
    void deleteItem(ScheduleDeleteDTO scheduleDeleteDTO);
    List<Schedule> findByDoctorIdAndWeekdayAndStatus(Long doctorId, EWeekday weekday, EStatus status);
    List<Schedule> findByWeekdayAndStatus(EWeekday weekday, EStatus status);
    List<Schedule> findAllByDoctorId(Long id);

}
