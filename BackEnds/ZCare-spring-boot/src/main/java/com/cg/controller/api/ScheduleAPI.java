package com.cg.controller.api;

import com.cg.model.DTO.*;
import com.cg.model.Doctor;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EStatus;
import com.cg.model.enumeration.EWeekday;
import com.cg.service.doctor.IDoctorService;
import com.cg.service.schedule.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleAPI {
    @Autowired
    private IScheduleService scheduleService;
    @Autowired
    private IDoctorService doctorService;

    @GetMapping("/{doctorId}")
    public ResponseEntity<?> getAllSchedule(@PathVariable Long doctorId) {
        List<Schedule> scheduleList = scheduleService.findAllByDoctorId(doctorId);
        List<ScheduleRespDTO> scheduleRespDTOList= scheduleList.stream().map(Schedule::toScheduleRespDTO).collect(Collectors.toList());
        return new ResponseEntity<>(scheduleRespDTOList, HttpStatus.OK);
    }

    @GetMapping("/{doctorId}/{weekday}")
    public ResponseEntity<?> getAllScheduleByDoctorId(@PathVariable Long doctorId, @PathVariable String weekday) {
        EWeekday weekdayEnum = EWeekday.getDayById(weekday);
        List<Schedule> scheduleList = scheduleService.findByDoctorIdAndWeekdayAndStatus(doctorId, weekdayEnum, EStatus.AVAILABLE);
        return new ResponseEntity<>(scheduleList, HttpStatus.OK);
    }

    @GetMapping("/getAll/{weekday}")
    public ResponseEntity<?> getAllScheduleByWeekday(@PathVariable String weekday) {
        EWeekday weekdayEnum = EWeekday.getDayById(weekday);
        List<Schedule> scheduleList = scheduleService.findByWeekdayAndStatus( weekdayEnum, EStatus.AVAILABLE);
        return new ResponseEntity<>(scheduleList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO scheduleDTO) {
        Long doctorId = scheduleDTO.getDoctorId();
        Doctor doctors = doctorService.findById(doctorId).get();
        List<ScheduleWeekDTO> listSchedules = scheduleDTO.getListSchedule();
        for (ScheduleWeekDTO scheduleWeekDTO : listSchedules) {
            String weekday = scheduleWeekDTO.getWeekdayGet();
            List<DetailTimeDTO> detailTimeDTOList = scheduleWeekDTO.getDetailTime();
            for (DetailTimeDTO detailTimeDTO : detailTimeDTOList) {
                Schedule newSchedule = new Schedule();
                newSchedule.setDoctor(doctors).setWeekday(EWeekday.getByWeekday(weekday)).setStatus(EStatus.AVAILABLE).setTimeItem(detailTimeDTO.getTimeDetailShow());
                scheduleService.create(newSchedule);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteScheduleDetail(@RequestBody ScheduleDeleteDTO scheduleDeleteDTO){
        scheduleService.deleteItem(scheduleDeleteDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
