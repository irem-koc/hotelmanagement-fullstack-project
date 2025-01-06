package com.iremkoc.hotel.hotelmanagement.service.interfaces;

import java.time.LocalDate;
import java.util.List;

import com.iremkoc.hotel.hotelmanagement.dto.AddRoomRequest;
import com.iremkoc.hotel.hotelmanagement.dto.EditRoomRequest;
import com.iremkoc.hotel.hotelmanagement.dto.Response;

public interface IRoomService {
    Response addNewRoom(AddRoomRequest addRoomRequest);

    Response getAllRooms();

    List<String> getAllRoomTypes();

    Response getRoomById(Long roomId);

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId, EditRoomRequest editRoomRequest);

    Response getAvailableRoomsByDataAndRoomType(String roomType, LocalDate checkInDate, LocalDate checkOutDate);

    Response getAllAvailableRooms();
}
