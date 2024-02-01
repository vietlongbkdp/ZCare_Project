package com.cg.model.DTO;

import com.cg.model.Medicine;
import com.cg.model.MedicineDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResultJsonDTO {
    private String diagResult;
    private String advice;
    private String doctorNotice;
    private String idBooking;
    private List<MedicineDTO> medicineList;
}
