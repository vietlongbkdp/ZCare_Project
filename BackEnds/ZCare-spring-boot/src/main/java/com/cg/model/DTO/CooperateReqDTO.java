package com.cg.model.DTO;

import com.cg.model.Cooperate;
import com.cg.model.enumeration.EStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CooperateReqDTO {
    private String fullName;
    private String phone;
    private String email;
    private String clinicName;
    private String address;
    private String content;

    public Cooperate toCooperate(){
        return new Cooperate()
                .setFullName(fullName)
                .setPhone(phone)
                .setEmail(email)
                .setClinicName(clinicName)
                .setAddress(address)
                .setContent(content);
    }
}
