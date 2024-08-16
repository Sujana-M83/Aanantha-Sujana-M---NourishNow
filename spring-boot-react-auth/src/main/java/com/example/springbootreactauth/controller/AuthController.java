package com.example.springbootreactauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.logging.Logger;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = Logger.getLogger(UserController.class.getName());
    
    @Autowired
    private JwtDecoder jwtDecoder;
    
    @PostMapping("/google")
    public ResponseEntity<String> googleLogin(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");
            JwtAuthenticationToken authToken = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            OAuth2User user = (OAuth2User) authToken.getPrincipal();
            return ResponseEntity.ok("User authenticated");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Authentication failed");
        }
    }
    @GetMapping("/account")
    public String accountPage(Authentication authentication, HttpServletRequest request) {
        if (authentication == null) {
            logger.warning("Authentication object is null");
            return "error";
        }
        
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof OAuth2User)) {
            logger.warning("Principal is not an instance of OAuth2User");
            return "error";
        }

        OAuth2User oauth2User = (OAuth2User) principal;
        String email = oauth2User.getAttribute("email");

        if (email != null) {
            request.setAttribute("email", email);
            logger.info("Email attribute set: " + email);
        } else {
            logger.warning("Email attribute is null");
        }

        return "account";
    }
}

