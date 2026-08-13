package com.example.expensesstracker.controller;

import com.example.expensesstracker.dto.UserProfileResponse;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getProfile() {
        return ResponseEntity.ok(userService.getProfile());
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateProfile(@RequestBody Map<String, String> body) {
        String fullName = body.get("name") != null ? body.get("name") : body.get("fullName");
        String email = body.get("email");
        return ResponseEntity.ok(userService.updateProfile(fullName, email));
    }
}
