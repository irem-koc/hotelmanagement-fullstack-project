package com.iremkoc.hotel.hotelmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.iremkoc.hotel.hotelmanagement.exception.OurException;
import com.iremkoc.hotel.hotelmanagement.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws OurException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new OurException("Username/Email not found"));
    }

}
