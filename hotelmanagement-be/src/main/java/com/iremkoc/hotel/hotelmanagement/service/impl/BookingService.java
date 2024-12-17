package com.iremkoc.hotel.hotelmanagement.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.iremkoc.hotel.hotelmanagement.dto.BookingDto;
import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.entity.Booking;
import com.iremkoc.hotel.hotelmanagement.entity.Room;
import com.iremkoc.hotel.hotelmanagement.entity.User;
import com.iremkoc.hotel.hotelmanagement.exception.OurException;
import com.iremkoc.hotel.hotelmanagement.repository.BookingRepository;
import com.iremkoc.hotel.hotelmanagement.repository.RoomRepository;
import com.iremkoc.hotel.hotelmanagement.repository.UserRepository;
import com.iremkoc.hotel.hotelmanagement.service.interfaces.IBookingService;
import com.iremkoc.hotel.hotelmanagement.service.interfaces.IRoomService;
import com.iremkoc.hotel.hotelmanagement.utils.Utils;

@Service
public class BookingService implements IBookingService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IRoomService roomService;

    @Override
    public Response saveBooking(Long roomId, Long userId, Booking bookingRequest) {
        Response response = new Response();
        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
                throw new IllegalArgumentException("Check in date must come after check out date");
            }
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new OurException("Room not found for booking"));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new OurException("User not found for booking"));

            List<Booking> bookingList = bookingRepository.findAll();
            if (!roomIsAvailable(bookingRequest, bookingList)) {
                throw new OurException("Room not available for selected date range");
            }
            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = Utils.randomAlphaNumeric(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.save(bookingRequest);
            response.setStatusCode(200);
            response.setMessage("Successfully saved the booking");
            response.setBookingConfirmationCode(bookingConfirmationCode);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during booking save " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response findBookingByConfirmatonCode(String confirmationCode) {
        Response response = new Response();
        try {
            Booking bookingByConfCode = bookingRepository.findByBookingConfirmationCode(confirmationCode)
                    .orElseThrow(() -> new OurException("there is no booking with this confirmation code"));
            BookingDto bookingDto = Utils.mapBookingEntityToBookingDtoBlusBookedRoom(bookingByConfCode, true);
            response.setStatusCode(200);
            response.setMessage("Successfully fetched booking with this conf code");
            response.setBooking(bookingDto);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room fetching booking with the conf. code" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllBookings() {
        Response response = new Response();
        try {
            List<Booking> bookings = bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<BookingDto> bookingDtos = Utils.mapBookingEntitiesToBookingDtos(bookings);
            response.setStatusCode(200);
            response.setMessage("Successfully fetched all bookings");
            response.setBookingList(bookingDtos);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room fetching all bookings " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response cancelBooking(Long bookingId) {
        Response response = new Response();
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new OurException("there is no booking whit this id " + bookingId));
            bookingRepository.deleteById(bookingId);
            response.setStatusCode(200);
            response.setMessage("Successfully canaceled booking");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during canceling booking" + e.getMessage());
        }
        return response;
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> bookingList) {
        return bookingList.stream()
                .noneMatch(existingBooking -> bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                        || bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                        || bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate()))
                        || (bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckInDate().equals(bookingRequest.getCheckInDate())));

    }

}
