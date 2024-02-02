package com.cg.repository;

import com.cg.model.Booking;
import com.cg.model.enumeration.EStatusBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findAllByCustomerId(Long customerId);
    List<Booking> findAllByClinicId(Long clinicId);
    @Query("SELECT b FROM Booking b " +
            "WHERE b.clinic.id = :clinicId " +
            "AND (b.customer.fullName LIKE %:search% " +
            "OR b.customer.phone LIKE %:search%)")
    List<Booking> findAllByClinicIdAndSearch(Long clinicId, String search);
    List<Booking> findAllByClinicIdAndCustomerId(Long clinicId, Long customerId);
    Booking findByCustomerIdAndScheduleId(Long customerId, Long scheduleId);
    List<Booking> findAllByDoctorId(Long doctorId);
    List<Booking> findByBookingDate(String bookingDate);
    List<Booking>findByClinicIdAndBookingDate(Long clinicId, String bookingDate);
    List<Booking> findByClinicIdAndDoctorIdAndBookingDateAndStatus(Long clinic_id, Long doctor_id, String bookingDate, EStatusBooking status);
    boolean existsByCustomerIdAndDoctorIdAndStatus(Long customer_id, Long doctor_id, EStatusBooking status);
    Booking findByCustomerIdAndDoctorIdAndStatus(Long customerId, Long doctorId, EStatusBooking status);
}
