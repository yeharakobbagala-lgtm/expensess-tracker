package com.example.expensesstracker.repository;

import com.example.expensesstracker.entity.Budget;
import com.example.expensesstracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByUser(User user);

    Optional<Budget> findByUserAndCategoryAndPeriod(
            User user,
            String category,
            String period
    );
}