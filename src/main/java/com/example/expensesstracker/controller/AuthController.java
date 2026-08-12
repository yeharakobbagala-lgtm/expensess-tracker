package com.example.expensesstracker.controller;

import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.expensesstracker.dto.LoginRequest;
//This Java class handles HTTP requests and returns data as responses
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User registeredUser = authService.register(user);
        return ResponseEntity.ok("User registered successfully");

    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {

        authService.login(request.getEmail(), request.getPassword());

        return ResponseEntity.ok("Login successful");
    }
}