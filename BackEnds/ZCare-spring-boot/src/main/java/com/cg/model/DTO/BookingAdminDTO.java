package com.cg.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingAdminDTO {
    private String customerName;
    private String address;
    private String dobCus;
    private String emailCus;
    private String gender;
    private String phoneCus;
    private String reason;
    private Long scheduleId;
    private String bookDay;
    private Long userId;
}
