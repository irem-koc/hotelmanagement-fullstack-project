package com.iremkoc.hotel.hotelmanagement.service.interfaces;

import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmatonCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
