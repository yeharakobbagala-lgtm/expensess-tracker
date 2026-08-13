package com.example.expensesstracker.controller;

import com.example.expensesstracker.dto.BudgetResponse;
import com.example.expensesstracker.entity.Budget;
import com.example.expensesstracker.service.BudgetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public ResponseEntity<Budget> createBudget(
            @RequestBody Budget budget) {

        Budget savedBudget =
                budgetService.createBudget(budget);

        return ResponseEntity.ok(savedBudget);
    }

    @GetMapping
    public ResponseEntity<List<BudgetResponse>> getMyBudgets() {

        List<BudgetResponse> budgets =
                budgetService.getMyBudgets();

        return ResponseEntity.ok(budgets);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Budget> updateBudget(
            @PathVariable Long id,
            @RequestBody Budget budget) {

        Budget updated =
                budgetService.updateBudget(id, budget);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(
            @PathVariable Long id) {

        budgetService.deleteBudget(id);

        return ResponseEntity.noContent().build();
    }
}