package com.iremkoc.hotel.hotelmanagement.controller;

import java.math.BigDecimal;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.service.interfaces.IRoomService;

@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {
    @Autowired
    private IRoomService roomService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewRoom(@RequestParam(value = "photo", required = false) String photo,
            @RequestParam(value = "roomType", required = false) String roomType,
            @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
            @RequestParam(value = "roomDescription", required = false) String roomDescription) {
        if (photo == null || photo.isEmpty() || roomType == null || roomType.isBlank() || roomPrice == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields (photo, roomType, roomPrice)");
            return ResponseEntity.status(response.getStatusCode()).body(response);

        }
        Response response = roomService.addNewRoom(photo, roomType, roomPrice, roomDescription);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/add")
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
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        if (roomType == null || roomType.isEmpty() || checkInDate == null || checkOutDate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields (roomType, checkInDate, checkOutDate)");
            return ResponseEntity.status(response.getStatusCode()).body(response);

        }
        Response response = roomService.getAvailableRoomsByDataAndRoomType(roomType, checkInDate, checkOutDate);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/update/{roomId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateRoom(@PathVariable Long id,
            @RequestParam(value = "photo", required = false) String photo,
            @RequestParam(value = "roomType", required = false) String roomType,
            @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
            @RequestParam(value = "roomDescription", required = false) String roomDescription) {
        Response response = roomService.updateRoom(id, photo, roomType, roomPrice, roomDescription);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete-room/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAvailableRoomsByDateAndType(@PathVariable Long id) {
        Response response = roomService.deleteRoom(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}