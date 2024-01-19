package com.cg.service.schedule;

import com.cg.model.DTO.DetailTimeDTO;
import com.cg.model.DTO.ScheduleDeleteDTO;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EWeekday;
import com.cg.repository.IScheduleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class ScheduleService implements IScheduleService{
    @Autowired
    private IScheduleRepository scheduleRepository;
    @Override
    public List<Schedule> findAll() {
        return scheduleRepository.findAll();
    }

    @Override
    public Optional<Schedule> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(Schedule schedule) {

    }

    @Override
    public void deleteById(Long id) {
        scheduleRepository.deleteById(id);
    }


    @Override
    public void create(Schedule newSchedule) {
        Long idDoctor = newSchedule.getDoctor().getId();
        List<Schedule> existingSchedules = scheduleRepository.findAllByDoctor_Id(idDoctor);

        boolean isScheduleConflict = false;
        for (Schedule existingSchedule : existingSchedules) {
            if (newSchedule.getWeekday().getWeekday().equals(existingSchedule.getWeekday().getWeekday()) &&
                    newSchedule.getTimeItem().equals(existingSchedule.getTimeItem())) {
                isScheduleConflict = true;
                break;
            }
        }
        if (!isScheduleConflict) {
            scheduleRepository.save(newSchedule);
        }
    }

    @Override
    public void deleteItem(ScheduleDeleteDTO scheduleDeleteDTO) {
        Schedule scheduleGet = scheduleRepository.findByDoctor_IdAndTimeItemAndWeekday(scheduleDeleteDTO.getIdDoctor(), scheduleDeleteDTO.getDetailTime(), EWeekday.getByWeekday(scheduleDeleteDTO.getWeekday()));
        if(scheduleGet != null){
            scheduleRepository.deleteById(scheduleGet.getId());
        }
    }
}
