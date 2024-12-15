package com.iremkoc.hotel.hotelmanagement.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.dto.RoomDto;
import com.iremkoc.hotel.hotelmanagement.entity.Room;
import com.iremkoc.hotel.hotelmanagement.exception.OurException;
import com.iremkoc.hotel.hotelmanagement.repository.RoomRepository;
import com.iremkoc.hotel.hotelmanagement.service.AwsS3Service;
import com.iremkoc.hotel.hotelmanagement.service.interfaces.IRoomService;
import com.iremkoc.hotel.hotelmanagement.utils.Utils;

@Service
public class RoomService implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired

    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription) {
        Response response = new Response();
        try {
            String imageUrl = awsS3Service.saveImagetoS3(photo);
            Room room = new Room();
            room.setRoomDescription(roomDescription);
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomPrice(roomPrice);
            room.setRoomType(roomType);
            Room savedRoom = roomRepository.save(room);
            RoomDto roomDto = Utils.mapRoomEntityToRoomDto(savedRoom);
            response.setStatusCode(200);
            response.setMessage("Successfully saved room");
            response.setRoom(roomDto);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room adding " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();
        try {
            List<Room> rooms = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDto> roomDtos = Utils.mapRoomEntitiesToRoomDtos(rooms);
            response.setStatusCode(200);
            response.setMessage("Successfully fetched room list");
            response.setRoomList(roomDtos);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room adding " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();
        try {
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room not found!"));
            RoomDto roomDto = Utils.mapRoomEntityToRoomDtoPlusBookings(room);
            response.setStatusCode(200);
            response.setMessage("Successfully found room which id is " + roomId);
            response.setRoom(roomDto);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room finding this id " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();
        try {
            roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room not found for delete operation!"));
            roomRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage("Successfully deleted room which id is " + roomId);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room deleting " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice,
            String roomDescription) {
        Response response = new Response();
        try {
            String imageUrl = null;
            if (photo != null & !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImagetoS3(photo);
            }
            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new OurException("Room not found for update operation!"));
            if (roomType != null)
                room.setRoomType(roomType);
            if (roomPrice != null)
                room.setRoomPrice(roomPrice);
            if (roomDescription != null)
                room.setRoomDescription(roomDescription);
            if (imageUrl != null)
                room.setRoomPhotoUrl(imageUrl);
            Room updatedRoom = roomRepository.save(room);
            RoomDto roomDto = Utils.mapRoomEntityToRoomDto(updatedRoom);
            response.setStatusCode(200);
            response.setMessage("Successfully updated room which id is " + roomId);
            response.setRoom(roomDto);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room adding " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDataAndRoomType(String roomType, LocalDate checkInDate, LocalDate checkOutDate) {
        Response response = new Response();
        try {
            List<Room> avaliableRooms = roomRepository.findAvaliableRoomsByDatesandTypes(checkInDate, checkOutDate,
                    roomType);
            List<RoomDto> roomDtos = Utils.mapRoomEntitiesToRoomDtos(avaliableRooms);

            response.setStatusCode(200);
            response.setMessage("Successfully fetched available rooms with checkin date: " + checkInDate
                    + " checkout date: " + checkOutDate + " roomType: " + roomType);
            response.setRoomList(roomDtos);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(
                    "Error occured during fetching available rooms by dates and room type " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();
        try {
            List<Room> avaliableRooms = roomRepository.getAllAvailableRooms();
            List<RoomDto> roomDtos = Utils.mapRoomEntitiesToRoomDtos(avaliableRooms);

            response.setStatusCode(200);
            response.setMessage("Successfully fetched all available rooms");
            response.setRoomList(roomDtos);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during room fetching all available rooms" + e.getMessage());
        }
        return response;
    }

}
