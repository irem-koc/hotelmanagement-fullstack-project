package com.iremkoc.hotel.hotelmanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EditUserProfileRequest {
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format")
    private String email;

    private String name;

    @NotBlank(message = "Phone number is mandatory")
    private String phoneNumber;

    private String password;
}
