package com.iremkoc.hotel.hotelmanagement.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.iremkoc.hotel.hotelmanagement.dto.LoginRequest;
import com.iremkoc.hotel.hotelmanagement.dto.Response;
import com.iremkoc.hotel.hotelmanagement.dto.UserDto;
import com.iremkoc.hotel.hotelmanagement.entity.User;
import com.iremkoc.hotel.hotelmanagement.exception.OurException;
import com.iremkoc.hotel.hotelmanagement.repository.UserRepository;
import com.iremkoc.hotel.hotelmanagement.service.interfaces.IUserService;
import com.iremkoc.hotel.hotelmanagement.utils.JWTUtils;
import com.iremkoc.hotel.hotelmanagement.utils.Utils;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + " already exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDto userDto = Utils.mapUserEntityToUserDto(savedUser);
            response.setUser(userDto);
            response.setStatusCode(200);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during user registration " + e.getMessage());
        }
        return null;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new OurException("User not found"));
            var jwt = jwtUtils.generateJwtToken(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setUser(Utils.mapUserEntityToUserDto(user));
            response.setRole(user.getRole());
            response.setExpirationTime("7 days");
            response.setMessage("Successfully logged in");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occured during user login " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUsers() {
        Response response = new Response();
        try {
            List<User> users = userRepository.findAll();
            List<UserDto> userDtos = Utils.mapUserEntitiesToUserDtos(users);
            response.setStatusCode(200);
            response.setMessage("Successfully users fetched");
            response.setUserList(userDtos);
        } catch (OurException e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users" + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found with id " + userId));
            UserDto userDto = Utils.mapUserEntityToUserDtoPlusUserBookingsAndRoom(user);
            response.setStatusCode(200);
            response.setMessage("Successfully fetched booking history");
            response.setUser(userDto);

        } catch (OurException e) {
            response.setStatusCode(500);
            response.setMessage("Error getting booking history" + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting booking history" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found with id " + userId));
            userRepository.deleteById(Long.valueOf(userId));
            response.setStatusCode(200);
            response.setMessage("Successfully deleted user with id " + userId);
        } catch (OurException e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting user" + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error deleting user" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found with id " + userId));
            UserDto userDto = Utils.mapUserEntityToUserDto(user);
            response.setStatusCode(200);
            response.setMessage("Successfully fetched user with id " + userId);
            response.setUser(userDto);
        } catch (OurException e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user" + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new OurException("User not found with email " + email));
            UserDto userDto = Utils.mapUserEntityToUserDtoPlusUserBookingsAndRoom(user);
            response.setStatusCode(200);
            response.setMessage("Successfully fetched user info");
            response.setUser(userDto);
        } catch (OurException e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user info" + e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting user info" + e.getMessage());
        }
        return response;
    }

}
