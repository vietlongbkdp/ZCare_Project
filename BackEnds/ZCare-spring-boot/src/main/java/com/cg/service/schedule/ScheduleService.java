package com.cg.service.schedule;

import com.cg.model.Schedule;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import com.cg.repository.IScheduleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    }

    @Override
    public void create(Schedule newSchedule) {
        scheduleRepository.save(newSchedule);
    }

    @Override
    public List<Schedule> findByDoctorIdAndWeekdayAndStatus(Long doctorId, EWeekday weekday, EStatus status) {
        return scheduleRepository.findByDoctorIdAndWeekdayAndStatus(doctorId,weekday,status);
    }

    @Override
    public List<Schedule> findByWeekdayAndStatus(EWeekday weekday, EStatus status) {
        return scheduleRepository.findByWeekdayAndStatus(weekday,status);
    }

    @Override
    public List<Schedule> findAllByDoctorId(Long id) {
        return scheduleRepository.findAllByDoctorId(id);
    }
}
