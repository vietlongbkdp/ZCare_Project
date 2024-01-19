package com.cg.model.DTO;

import com.cg.model.Clinic;
import com.cg.model.Position;
import com.cg.model.Schedule;
import com.cg.model.Speciality;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class DoctorResDTO {
    private Long id;
    private String doctorName;
    private Position position;
    private LocalDate dob;
    private String email;
    private String phone;
    private LocalDate createAt;
    private BigDecimal fee;
    private Clinic clinic;
    private String avatarImg;
    private Integer star;
    private String doctorInfo;
    private Speciality speciality;
    private List<Schedule> scheduleList;
}
