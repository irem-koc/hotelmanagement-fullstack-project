package com.iremkoc.hotel.hotelmanagement.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class EditRoomRequest {
    private String roomDescription;
    private String roomType;
    private BigDecimal roomPrice;
    private String photo;
}
