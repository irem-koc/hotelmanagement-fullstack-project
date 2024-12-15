package com.iremkoc.hotel.hotelmanagement.service.interfaces;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.iremkoc.hotel.hotelmanagement.dto.Response;

public interface IRoomService {
    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription);

    Response getAllRooms();

    List<String> getAllRoomTypes();

    Response getRoomById(Long roomId);

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice,
            String roomDescription);

    Response getAvailableRoomsByDataAndRoomType(String roomType, LocalDate checkInDate, LocalDate checkOutDate);

    Response getAllAvailableRooms();
}
