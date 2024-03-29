package com.cg.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ResultReqDTO {
    private String diagResult;
    private String fileName;
    private String fileType;
    private byte[] file;
    private String advice;
    private String doctorNotice;
    private List<MedicineDTO> medicineList;
}
