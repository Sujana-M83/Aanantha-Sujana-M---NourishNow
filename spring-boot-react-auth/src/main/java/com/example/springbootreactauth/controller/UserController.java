package com.example.springbootreactauth.controller;

import com.example.springbootreactauth.model.User;
import com.example.springbootreactauth.repository.UserRepository;
import com.example.springbootreactauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(Authentication authentication) {
        String email = authentication.getName(); // Assuming the email is the username
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
public ResponseEntity<String> register(@RequestBody User user) {
    try {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.OK).body("User registered successfully");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
    }
}
@GetMapping("/profile")
public ResponseEntity<User> getUserProfile(Authentication authentication) {
    String email = authentication.getName(); // Get the email from the authentication object
    User user = userService.findByEmail(email);
    return ResponseEntity.ok(user);
}

@PutMapping("/profile/change-password")
public ResponseEntity<String> updatePassword(@RequestParam String email, @RequestParam String newPassword) {
    User user = userService.findByEmail(email);
    if (user != null) {
        user.setPassword(newPassword); // Make sure to encode the password
        userRepository.save(user);
        return ResponseEntity.ok("Password updated successfully");
    }
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
}

@PostMapping("/google-login")
public ResponseEntity<String> googleLogin(@RequestParam("token") String token) {
    try {
        // Validate the token and authenticate the user
        User user = userService.authenticateGoogleToken(token);
        if (user != null) {
            return ResponseEntity.ok("Google login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Google login failed");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google login failed: " + e.getMessage());
    }
}

@PostMapping("/login")
public ResponseEntity<String> login(@RequestBody User user) {
    try {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.OK).body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + e.getMessage());
    }
}


}
