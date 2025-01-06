package com.iremkoc.hotel.hotelmanagement.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iremkoc.hotel.hotelmanagement.dto.AddRoomRequest;
import com.iremkoc.hotel.hotelmanagement.dto.EditRoomRequest;
import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.service.interfaces.IRoomService;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {
    @Autowired
    private IRoomService roomService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewRoom(@RequestBody AddRoomRequest addRoomRequest) {
        if (addRoomRequest.getPhoto() == null || addRoomRequest.getPhoto().isEmpty()
                || addRoomRequest.getRoomType() == null || addRoomRequest.getRoomType().isBlank()
                || addRoomRequest.getRoomPrice() == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields (photo, roomType, roomPrice)");
            return ResponseEntity.status(response.getStatusCode()).body(response);

        }
        System.out.println(addRoomRequest + "addRoomRequest");
        Response response = roomService.addNewRoom(addRoomRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAll() {
        Response response = roomService.getAllRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getAllTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/room-by-id/{id}")
    public ResponseEntity<Response> getRoomById(@PathVariable Long id) {
        Response response = roomService.getRoomById(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-rooms")
    public ResponseEntity<Response> getAvailableRooms() {
        Response response = roomService.getAllAvailableRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<Response> getAvailableRoomsByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String roomType) {
        if (roomType == null || checkInDate == null || checkOutDate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields (roomType,checkInDate, checkOutDate)");
            return ResponseEntity.status(response.getStatusCode()).body(response);

        }
        Response response = roomService.getAvailableRoomsByDataAndRoomType(roomType, checkInDate, checkOutDate);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateRoom(@PathVariable Long id,
            @RequestBody EditRoomRequest editRoomRequest) {
        Response response = roomService.updateRoom(id, editRoomRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete-room/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteRoomById(@PathVariable Long id) {
        Response response = roomService.deleteRoom(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}