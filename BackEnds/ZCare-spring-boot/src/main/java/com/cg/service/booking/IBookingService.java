package com.cg.service.booking;

import com.cg.model.Booking;
import com.cg.model.enumeration.EStatusBooking;
import com.cg.service.IGeneralService;

import java.util.List;

public interface IBookingService extends IGeneralService<Booking,Long> {
    List<Booking> findAllByCustomerId(Long customerId);
    Booking findByCustomerIdAndScheduleId(Long customerId, Long scheduleId);
    List<Booking>findByClinicIdAndBookingDate(Long clinicId, String bookingDate);
    List<Booking> findAllByDoctorId(Long doctorId);
    List<Booking> findByClinicIdAndDoctorIdAndBookingDateAndStatus(Long clinic_id, Long doctor_id, String bookingDate, EStatusBooking status);
    boolean existsByCustomerIdAndDoctorIdAndStatus(Long customer_id, Long doctor_id, EStatusBooking status);
    Booking findByCustomerIdAndDoctorIdAndStatus(Long customerId, Long doctorId, EStatusBooking status);
}
