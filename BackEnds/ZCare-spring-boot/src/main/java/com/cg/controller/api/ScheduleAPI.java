package com.cg.controller.api;

import com.cg.model.DTO.DetailTimeDTO;
import com.cg.model.DTO.ScheduleDTO;
import com.cg.model.DTO.ScheduleWeekDTO;
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

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*")
public class ScheduleAPI {
    @Autowired
    private IScheduleService scheduleService;
    @Autowired
    private IDoctorService doctorService;
    @GetMapping
    public ResponseEntity<?> getAllSchedule(){
        List<Schedule> scheduleList = scheduleService.findAll();
        return new ResponseEntity<>(scheduleList, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO scheduleDTO){
        Long idDoctor = scheduleDTO.getIdDoctor();
        Doctor doctors = doctorService.findById(idDoctor).get();
        List<ScheduleWeekDTO> listSchedule = scheduleDTO.getListSchedule();
        listSchedule.forEach((item) ->{
            String weekday = item.getWeekdayGet();
            List<DetailTimeDTO> detailTimeDTOList = item.getDetailTime();
            detailTimeDTOList.forEach((items) ->{
                Schedule newSchedule = new Schedule();
                newSchedule.setDoctor(doctors).setWeekday(EWeekday.valueOf(weekday)).setStatus(EStatus.AVAILABLE).setTimeItem(items.getTimeDetailShow());
                scheduleService.create(newSchedule);
            });
        });
        return new ResponseEntity<>(HttpStatus.OK);
    }
}