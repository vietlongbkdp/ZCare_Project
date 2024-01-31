package com.cg.service.medicineDetail;

import com.cg.model.DTO.MedicineDTO;
import com.cg.model.Medicine;
import com.cg.model.MedicineDetail;
import com.cg.model.Result;
import com.cg.model.enumeration.EUnitMedicine;
import com.cg.repository.IMedicineDetailRepository;
import com.cg.repository.IMedicineRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class MedicineDetailService implements IMedicineDetailService{
    @Autowired
    private IMedicineDetailRepository medicineDetailRepository;
    @Autowired
    private IMedicineRepository medicineRepository;
    @Override
    public List<MedicineDetail> findAll() {
        return medicineDetailRepository.findAll();
    }

    @Override
    public Optional<MedicineDetail> findById(Long id) {
        return medicineDetailRepository.findById(id);
    }

    @Override
    public void save(MedicineDetail medicineDetail) {
        medicineDetailRepository.save(medicineDetail);
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public void toMedicineDetail(MedicineDTO medicineDTO, Result result) {
        Medicine medicine = medicineRepository.getMedicinesByMedicineName(medicineDTO.getMedicineName());
        MedicineDetail medicineDetail = new MedicineDetail().setMedicine(medicine)
                .setQuantity(medicineDTO.getQuantity())
                .setUnitMedicine(EUnitMedicine.getByUnit(medicineDTO.getUnit()))
                .setUseNote(medicineDTO.getUseNote())
                .setResult(result);
        medicineDetailRepository.save(medicineDetail);
    }
}
