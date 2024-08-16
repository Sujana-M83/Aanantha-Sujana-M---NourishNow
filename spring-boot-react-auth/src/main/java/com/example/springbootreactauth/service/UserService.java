package com.example.springbootreactauth.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springbootreactauth.model.User;
import com.example.springbootreactauth.repository.UserRepository;

@Service
public interface UserService {
    
    
    User findByEmail(String email);
    User saveUser(User user);
    User authenticateGoogleToken(String token);
}