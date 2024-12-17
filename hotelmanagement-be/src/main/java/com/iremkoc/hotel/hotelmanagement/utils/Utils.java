package com.iremkoc.hotel.hotelmanagement.utils;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

import com.iremkoc.hotel.hotelmanagement.dto.BookingDto;
import com.iremkoc.hotel.hotelmanagement.dto.RoomDto;
import com.iremkoc.hotel.hotelmanagement.dto.UserDto;
import com.iremkoc.hotel.hotelmanagement.entity.Booking;
import com.iremkoc.hotel.hotelmanagement.entity.Room;
import com.iremkoc.hotel.hotelmanagement.entity.User;

public class Utils {
    private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final SecureRandom secureRandom = new SecureRandom();

    public static String randomAlphaNumeric(int count) {
        StringBuilder builder = new StringBuilder();
        while (count-- != 0) {
            int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

    public static UserDto mapUserEntityToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRole(user.getRole());
        return userDto;
    }

    public static RoomDto mapRoomEntityToRoomDto(Room room) {
        RoomDto roomDto = new RoomDto();
        roomDto.setId(room.getId());
        roomDto.setRoomType(room.getRoomType());
        roomDto.setRoomPrice(room.getRoomPrice());
        roomDto.setRoomPhotoUrl(room.getRoomPhotoUrl());

        return roomDto;
    }

    public static BookingDto mapBookingEntityToBookingDto(Booking booking) {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setCheckInDate(booking.getCheckInDate());
        bookingDto.setCheckOutDate(booking.getCheckOutDate());
        bookingDto.setNumOfAdults(booking.getNumOfAdults());
        bookingDto.setNumOfChildren(booking.getNumOfChildren());
        bookingDto.setTotalNumOfGuests(booking.getTotalNumOfGuests());
        bookingDto.setBookingConfirmationCode(booking.getBookingConfirmationCode());

        return bookingDto;
    }

    public static RoomDto mapRoomEntityToRoomDtoPlusBookings(Room room) {
        RoomDto roomDto = new RoomDto();
        roomDto.setId(room.getId());
        roomDto.setRoomType(room.getRoomType());
        roomDto.setRoomPrice(room.getRoomPrice());
        roomDto.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDto.setRoomDescription(room.getRoomDescription());
        if (room.getBookings() != null) {
            roomDto.setBookings(room.getBookings().stream()
                    .map(Utils::mapBookingEntityToBookingDto)
                    .collect(Collectors.toList()));
        }
        return roomDto;

    }

    public static UserDto mapUserEntityToUserDtoPlusUserBookingsAndRoom(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDto.setBookings(user.getBookings().stream()
                    .map(booking -> mapBookingEntityToBookingDtoBlusBookedRoom(booking, false))
                    .collect(Collectors.toList()));
        }
        return userDto;
    }

    public static BookingDto mapBookingEntityToBookingDtoBlusBookedRoom(Booking booking, boolean mapUser) {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setCheckInDate(booking.getCheckInDate());
        bookingDto.setCheckOutDate(booking.getCheckOutDate());
        bookingDto.setNumOfAdults(booking.getNumOfAdults());
        bookingDto.setNumOfChildren(booking.getNumOfChildren());
        bookingDto.setTotalNumOfGuests(booking.getTotalNumOfGuests());
        bookingDto.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if (mapUser) {
            bookingDto.setUser(mapUserEntityToUserDto(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            RoomDto roomDto = new RoomDto();
            roomDto.setId(booking.getRoom().getId());
            roomDto.setRoomType(booking.getRoom().getRoomType());
            roomDto.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDto.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            roomDto.setRoomDescription(booking.getRoom().getRoomDescription());
            bookingDto.setRoom(roomDto);

        }
        return bookingDto;
    }

    public static List<RoomDto> mapRoomEntitiesToRoomDtos(List<Room> rooms) {
        return rooms.stream()
                .map(Utils::mapRoomEntityToRoomDto)
                .collect(Collectors.toList());
    }

    public static List<UserDto> mapUserEntitiesToUserDtos(List<User> users) {
        return users.stream()
                .map(Utils::mapUserEntityToUserDto)
                .collect(Collectors.toList());
    }

    public static List<BookingDto> mapBookingEntitiesToBookingDtos(List<Booking> bookings) {
        return bookings.stream()
                .map(Utils::mapBookingEntityToBookingDto)
                .collect(Collectors.toList());
    }
}
