package com.example.springbootreactauth.controller;

import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootreactauth.model.User;
import com.example.springbootreactauth.service.UserServiceImpl;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/currentUser")
public ResponseEntity<User> getCurrentUser(Principal principal) {
    if (principal == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    String email = principal.getName();
    User currentUser = userService.findByEmail(email);
    return ResponseEntity.ok(currentUser);
}
}
