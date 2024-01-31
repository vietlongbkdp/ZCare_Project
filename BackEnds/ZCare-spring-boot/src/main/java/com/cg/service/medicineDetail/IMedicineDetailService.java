package com.cg.service.medicineDetail;

import com.cg.model.DTO.MedicineDTO;
import com.cg.model.MedicineDetail;
import com.cg.model.Result;
import com.cg.service.IGeneralService;

public interface IMedicineDetailService extends IGeneralService<MedicineDetail, Long> {
    void toMedicineDetail(MedicineDTO medicineDTO, Result result);
}
