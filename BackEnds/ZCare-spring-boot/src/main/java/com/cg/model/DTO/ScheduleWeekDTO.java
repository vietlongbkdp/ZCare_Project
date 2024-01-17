package com.cg.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleWeekDTO {
    private String weekdayGet;
    private List<DetailTimeDTO> detailTime;
}
