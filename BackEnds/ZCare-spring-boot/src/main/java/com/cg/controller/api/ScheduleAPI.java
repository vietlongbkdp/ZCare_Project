package com.cg.controller.api;

import com.cg.model.DTO.DetailTimeDTO;
import com.cg.model.DTO.ScheduleDTO;
import com.cg.model.DTO.ScheduleRespDTO;
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
    @GetMapping
    public ResponseEntity<?> getAllSchedule(){
        List<Schedule> scheduleList = scheduleService.findAll();
        List<ScheduleRespDTO> scheduleRespDTOList= scheduleList.stream().map(Schedule::toScheduleRespDTO).collect(Collectors.toList());
        return new ResponseEntity<>(scheduleRespDTOList, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleDTO scheduleDTO){
        Long idDoctor = scheduleDTO.getIdDoctor();
        Doctor doctors = doctorService.findById(idDoctor).get();
        List<ScheduleWeekDTO> listSchedules = scheduleDTO.getListSchedule();
        for (ScheduleWeekDTO scheduleWeekDTO: listSchedules){
            String weekday = scheduleWeekDTO.getWeekdayGet();
            List<DetailTimeDTO> detailTimeDTOList = scheduleWeekDTO.getDetailTime();
            for (DetailTimeDTO detailTimeDTO: detailTimeDTOList){
                Schedule newSchedule = new Schedule();
                newSchedule.setDoctor(doctors).setWeekday(EWeekday.getByWeekday(weekday)).setStatus(EStatus.AVAILABLE).setTimeItem(detailTimeDTO.getTimeDetailShow());
                scheduleService.create(newSchedule);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
