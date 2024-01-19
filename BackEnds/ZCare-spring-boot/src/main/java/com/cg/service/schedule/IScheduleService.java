package com.cg.service.schedule;

import com.cg.model.DTO.ScheduleDeleteDTO;
import com.cg.model.Schedule;
import com.cg.service.IGeneralService;

public interface IScheduleService extends IGeneralService<Schedule, Long> {
    void create(Schedule newSchedule);

    void deleteItem(ScheduleDeleteDTO scheduleDeleteDTO);
}
