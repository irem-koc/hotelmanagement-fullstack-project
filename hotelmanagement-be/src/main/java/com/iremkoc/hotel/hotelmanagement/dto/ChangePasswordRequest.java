package com.iremkoc.hotel.hotelmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank(message = "Current password cannot be empty")
    private String currentPassword;

    @NotBlank(message = "New password cannot be empty")
    private String newPassword;

    @NotBlank(message = "New password check cannot be empty")
    private String newPasswordCheck;
}
