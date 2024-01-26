package com.cg.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private String customerName;
    private String address;
    private String dobCus;
    private String gender;
    private String patientName;
    private String phoneCus;
    private String reason;
    private Long scheduleId;
    private String bookDay;
    private Long idCustomer;
}
