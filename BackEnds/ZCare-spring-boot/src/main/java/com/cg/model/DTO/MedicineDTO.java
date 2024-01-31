package com.cg.model.DTO;

import com.cg.model.MedicineDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDTO {
    private String medicineName;
    private Long quantity;
    private String unit;
    private String useNote;
}
