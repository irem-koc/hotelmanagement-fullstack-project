package com.iremkoc.hotel.hotelmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iremkoc.hotel.hotelmanagement.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRoomId(Long roomId);

    List<Booking> findByUserId(Long userId);

    List<Booking> findByConfirmationCode(String confirmationCode);

}
