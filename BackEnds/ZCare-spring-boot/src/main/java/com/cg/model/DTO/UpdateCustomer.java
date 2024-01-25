package com.cg.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCustomer {
    private String fullName;
    private String dob;
    private String phone;
    private String email;
    private String address;
    private String gender;
}
