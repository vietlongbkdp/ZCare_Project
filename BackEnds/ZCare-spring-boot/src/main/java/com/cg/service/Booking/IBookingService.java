package com.cg.service.Booking;

import com.cg.model.Booking;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IBookingService extends IGeneralService<Booking,Long> {
    List<Booking> findAllByCustomerId(Long customerId);
}
