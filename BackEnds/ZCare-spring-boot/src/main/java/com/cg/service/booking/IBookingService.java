package com.cg.service.booking;

import com.cg.model.Booking;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IBookingService extends IGeneralService<Booking,Long> {
    List<Booking> findAllByCustomerId(Long customerId);
    Booking findByCustomerIdAndScheduleId(Long customerId, Long scheduleId);

    List<Booking> findAllByDoctorId(Long doctorId);
}
