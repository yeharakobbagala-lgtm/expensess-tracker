package com.example.expensesstracker.service;

import com.example.expensesstracker.dto.BudgetResponse;
import com.example.expensesstracker.entity.Budget;
import com.example.expensesstracker.entity.Transaction;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.repository.BudgetRepository;
import com.example.expensesstracker.repository.TransactionRepository;
import com.example.expensesstracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public BudgetService(
            BudgetRepository budgetRepository,
            TransactionRepository transactionRepository,
            UserRepository userRepository) {

        this.budgetRepository = budgetRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    public Budget createBudget(Budget budget) {

        User user = getCurrentUser();

        Optional<Budget> existing =
                budgetRepository.findByUserAndCategoryAndPeriod(
                        user,
                        budget.getCategory(),
                        budget.getPeriod()
                );

        if (existing.isPresent()) {
            throw new RuntimeException(
                    "A budget already exists for this category and month"
            );
        }

        budget.setUser(user);

        return budgetRepository.save(budget);
    }

    public List<BudgetResponse> getMyBudgets() {

        User user = getCurrentUser();

        List<Budget> budgets =
                budgetRepository.findByUser(user);

        List<Transaction> transactions =
                transactionRepository.findByUser(user);

        return budgets.stream()
                .map(budget -> {

                    YearMonth budgetMonth =
                            YearMonth.parse(budget.getPeriod());

                    double spent = transactions.stream()
                            .filter(t ->
                                    "expense".equalsIgnoreCase(t.getType()))
                            .filter(t ->
                                    budget.getCategory()
                                            .equalsIgnoreCase(t.getCategory()))
                            .filter(t ->
                                    YearMonth.from(t.getDate())
                                            .equals(budgetMonth))
                            .mapToDouble(Transaction::getAmount)
                            .sum();

                    double remaining =
                            budget.getLimit() - spent;

                    double percentageUsed =
                            budget.getLimit() == 0
                                    ? 0
                                    : (spent / budget.getLimit()) * 100;

                    return new BudgetResponse(
                            budget.getId(),
                            budget.getCategory(),
                            budget.getLimit(),
                            budget.getPeriod(),
                            spent,
                            remaining,
                            percentageUsed
                    );
                })
                .collect(Collectors.toList());
    }

    public Budget updateBudget(Long id, Budget updatedBudget) {

        User user = getCurrentUser();

        Budget existing = budgetRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Budget not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Unauthorized budget access"
            );
        }

        existing.setCategory(updatedBudget.getCategory());
        existing.setLimit(updatedBudget.getLimit());
        existing.setPeriod(updatedBudget.getPeriod());

        return budgetRepository.save(existing);
    }

    public void deleteBudget(Long id) {

        User user = getCurrentUser();

        Budget existing = budgetRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Budget not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Unauthorized budget access"
            );
        }

        budgetRepository.delete(existing);
    }
}