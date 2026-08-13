package com.example.expensesstracker.service;

import com.example.expensesstracker.dto.UserProfileResponse;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public UserProfileResponse getProfile() {
        User user = getCurrentUser();
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail());
    }

    public UserProfileResponse updateProfile(String fullName, String email) {
        User user = getCurrentUser();
        if (fullName != null && !fullName.trim().isEmpty()) {
            user.setFullName(fullName.trim());
        }
        if (email != null && !email.trim().isEmpty() && !email.equalsIgnoreCase(user.getEmail())) {
            if (userRepository.findByEmail(email.trim()).isPresent()) {
                throw new RuntimeException("Email already in use");
            }
            user.setEmail(email.trim());
        }
        User saved = userRepository.save(user);
        return new UserProfileResponse(saved.getId(), saved.getFullName(), saved.getEmail());
    }
}