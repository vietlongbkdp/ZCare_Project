package com.cg.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResultReqDTO {
    private String diagResult;
    private String advice;
    private String doctorNotice;
    private List<MedicineDTO> medicineList;
}
