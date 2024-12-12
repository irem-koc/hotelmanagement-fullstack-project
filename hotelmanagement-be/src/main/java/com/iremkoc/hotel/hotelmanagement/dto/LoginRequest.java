package com.iremkoc.hotel.hotelmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Email cannot be empty")
    private String email;
    @NotBlank(message = "Password cannot be empty")
    private String password;
}
