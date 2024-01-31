package com.cg.repository;

import com.cg.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findAllByCustomerId(Long customerId);
    List<Booking> findAllByClinicId(Long clinicId);
    Booking findByCustomerIdAndScheduleId(Long customerId, Long scheduleId);

    List<Booking> findAllByDoctorId(Long doctorId);
    List<Booking> findByBookingDate(String bookingDate);

}
