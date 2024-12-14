package com.iremkoc.hotel.hotelmanagement.service.interfaces;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.iremkoc.hotel.hotelmanagement.dto.Response;

public interface IRoomService {
    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription);

    Response getAllRooms();

    List<String> getAllRoomTypes();

    Response getRoomById(String roomId);

    Response deleteRoom(String roomId);

    Response updateRoom(String roomId, MultipartFile photo, String roomType, BigDecimal roomPrice,
            String roomDescription);

    Response getAvailableRoomsByDataAndRoomType(String roomType, String checkInDate, String checkOutDate);

    Response getAllAvailableRooms();
}
