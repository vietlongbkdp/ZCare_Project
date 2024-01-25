package com.cg.repository;

import com.cg.model.Booking;
import com.cg.model.Customer;
import com.cg.model.DTO.BookingDTO;
import com.cg.model.Schedule;
import com.cg.model.enumeration.EStatusBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public interface IBookingRepository extends JpaRepository<Booking, Long> {

}
