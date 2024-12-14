package com.iremkoc.hotel.hotelmanagement.service.interfaces;

import com.iremkoc.hotel.hotelmanagement.dto.LoginRequest;
import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequet);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
