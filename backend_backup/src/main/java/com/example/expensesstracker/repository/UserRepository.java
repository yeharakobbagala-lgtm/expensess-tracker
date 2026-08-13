package com.example.expensesstracker.repository;

import com.example.expensesstracker.entity.User;
//JpaRepository gives us ready-made database operations.
import org.springframework.data.jpa.repository.JpaRepository;
//There might be a User here, or there might not be
import java.util.Optional;

                                                   //Create a repository for the User entity, whose ID is a Long
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
