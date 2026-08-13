package com.example.expensesstracker.service;

import com.example.expensesstracker.dto.CategorySpendingResponse;
import com.example.expensesstracker.dto.DashboardResponse;
import com.example.expensesstracker.entity.Transaction;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.repository.TransactionRepository;
import com.example.expensesstracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import com.example.expensesstracker.dto.MonthlyOverviewResponse;

import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public DashboardService(
            TransactionRepository transactionRepository,
            UserRepository userRepository) {

        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboard() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Transaction> transactions =
                transactionRepository.findByUser(user);

        double totalIncome = transactions.stream()
                .filter(t -> "income".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalExpenses = transactions.stream()
                .filter(t -> "expense".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalBalance = totalIncome - totalExpenses;

        return new DashboardResponse(
                totalBalance,
                totalIncome,
                totalExpenses
        );
    }
    public List<MonthlyOverviewResponse> getMonthlyOverview() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Transaction> transactions =
                transactionRepository.findByUser(user);

        List<MonthlyOverviewResponse> result = new ArrayList<>();

        YearMonth currentMonth = YearMonth.now();

        // Last 6 months, including the current month
        for (int i = 5; i >= 0; i--) {

            YearMonth month = currentMonth.minusMonths(i);

            double income = transactions.stream()
                    .filter(t -> "income".equalsIgnoreCase(t.getType()))
                    .filter(t -> YearMonth.from(t.getDate()).equals(month))
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            double expenses = transactions.stream()
                    .filter(t -> "expense".equalsIgnoreCase(t.getType()))
                    .filter(t -> YearMonth.from(t.getDate()).equals(month))
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            String monthName = month.getMonth()
                    .getDisplayName(
                            TextStyle.SHORT,
                            Locale.ENGLISH
                    );

            result.add(
                    new MonthlyOverviewResponse(
                            monthName,
                            income,
                            expenses
                    )
            );
        }

        return result;
    }
    public List<CategorySpendingResponse> getCategorySpending() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Transaction> transactions =
                transactionRepository.findByUser(user);

        Map<String, Double> categoryTotals = transactions.stream()
                .filter(t -> "expense".equalsIgnoreCase(t.getType()))
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        return categoryTotals.entrySet()
                .stream()
                .map(entry -> new CategorySpendingResponse(
                        entry.getKey(),
                        entry.getValue()
                ))
                .collect(Collectors.toList());
    }


}
