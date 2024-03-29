package com.cg.repository;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findAllByDoctor_Id(Long id);
    Schedule findByDoctor_IdAndTimeItemAndWeekday(Long idDoctor, String timeItem, EWeekday weekday);
    List<Schedule> findByDoctorIdAndWeekdayAndStatus(Long doctorId, EWeekday weekday, EStatus status);
    List<Schedule> findAllByDoctorId(Long id);
}
