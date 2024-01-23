package com.cg.model.DTO;

import com.cg.model.Doctor;
import com.cg.model.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorReqDTO {
    private String doctorName;;
    private String position;
    private String dob;
    private String email;
    private String phone;
    private String fee;
    private Long clinicId;
    private String avatarImg;
    private String speciality;
    private String doctorInfo;
}
