package com.cg.service.booking;

import com.cg.model.Booking;
import com.cg.model.DTO.BookingDTO;
import com.cg.service.IGeneralService;

public interface IBookingService extends IGeneralService<Booking, Long> {
    Booking toBooking(BookingDTO bookingDTO);

    void createBooking(Booking booking);
}
