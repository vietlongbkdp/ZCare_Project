package com.cg.service.clinic;

import com.cg.model.Clinic;
import com.cg.model.Customer;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IClinicService extends IGeneralService<Clinic, Long> {
    List<Clinic> findAllByUser_Unlock(boolean user_unlock);
    Clinic findByUser_Id(Long id);
    void update(Clinic clinic);
}
