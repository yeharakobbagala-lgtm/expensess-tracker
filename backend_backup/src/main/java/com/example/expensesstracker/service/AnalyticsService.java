package com.example.expensesstracker.service;

import com.example.expensesstracker.dto.AnalyticsResponse;
import com.example.expensesstracker.entity.Transaction;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.repository.TransactionRepository;
import com.example.expensesstracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AnalyticsService(
            TransactionRepository transactionRepository,
            UserRepository userRepository) {

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

    public AnalyticsResponse getAnalytics(String range) {

        User user = getCurrentUser();

        List<Transaction> transactions =
                transactionRepository.findByUser(user);

        LocalDate today = LocalDate.now();

        LocalDate startDate;

        switch (range.toLowerCase()) {

            case "week":
                startDate = today.with(
                        TemporalAdjusters.previousOrSame(
                                DayOfWeek.MONDAY));
                break;

            case "3months":
                startDate = today
                        .minusMonths(2)
                        .withDayOfMonth(1);
                break;

            case "year":
                startDate = today.withDayOfYear(1);
                break;

            case "month":
            default:
                startDate = today.withDayOfMonth(1);
                break;
        }

        List<Transaction> filteredTransactions =
                transactions.stream()
                        .filter(t ->
                                !t.getDate().isBefore(startDate))
                        .filter(t ->
                                !t.getDate().isAfter(today))
                        .toList();

        List<AnalyticsResponse.MonthlyAnalytics> monthlyData =
                createMonthlyData(
                        filteredTransactions,
                        range
                );

        List<AnalyticsResponse.CategoryAnalytics> categorySpending =
                createCategoryData(filteredTransactions);

        List<AnalyticsResponse.WeeklyAnalytics> weeklyData =
                createWeeklyData(filteredTransactions);

        return new AnalyticsResponse(
                monthlyData,
                categorySpending,
                weeklyData
        );
    }

    private List<AnalyticsResponse.MonthlyAnalytics> createMonthlyData(
            List<Transaction> transactions,
            String range) {

        Map<String, double[]> monthlyTotals =
                new LinkedHashMap<>();

        LocalDate today = LocalDate.now();

        int numberOfMonths;

        switch (range.toLowerCase()) {

            case "3months":
                numberOfMonths = 3;
                break;

            case "year":
                numberOfMonths = 12;
                break;

            case "week":
                numberOfMonths = 1;
                break;

            case "month":
            default:
                numberOfMonths = 1;
                break;
        }

        for (int i = numberOfMonths - 1; i >= 0; i--) {

            YearMonth month =
                    YearMonth.from(today.minusMonths(i));

            String key = month.toString();

            monthlyTotals.put(
                    key,
                    new double[]{0.0, 0.0}
            );
        }

        for (Transaction transaction : transactions) {

            String month =
                    YearMonth.from(transaction.getDate())
                            .toString();

            if (!monthlyTotals.containsKey(month)) {
                continue;
            }

            double[] totals =
                    monthlyTotals.get(month);

            if ("income".equalsIgnoreCase(
                    transaction.getType())) {

                totals[0] += transaction.getAmount();

            } else if ("expense".equalsIgnoreCase(
                    transaction.getType())) {

                totals[1] += transaction.getAmount();
            }
        }

        List<AnalyticsResponse.MonthlyAnalytics> result =
                new ArrayList<>();

        for (Map.Entry<String, double[]> entry :
                monthlyTotals.entrySet()) {

            YearMonth month =
                    YearMonth.parse(entry.getKey());

            String label =
                    month.getMonth()
                            .toString()
                            .substring(0, 3);

            result.add(
                    new AnalyticsResponse.MonthlyAnalytics(
                            label,
                            entry.getValue()[0],
                            entry.getValue()[1]
                    )
            );
        }

        return result;
    }

    private List<AnalyticsResponse.CategoryAnalytics> createCategoryData(
            List<Transaction> transactions) {

        Map<String, Double> categoryTotals =
                new LinkedHashMap<>();

        for (Transaction transaction : transactions) {

            if (!"expense".equalsIgnoreCase(
                    transaction.getType())) {
                continue;
            }

            categoryTotals.merge(
                    transaction.getCategory(),
                    transaction.getAmount(),
                    Double::sum
            );
        }

        List<AnalyticsResponse.CategoryAnalytics> result =
                new ArrayList<>();

        String[] colors = {
                "#f5c518",
                "#3b82f6",
                "#8b5cf6",
                "#06b6d4",
                "#ef4444",
                "#10b981"
        };

        int colorIndex = 0;

        for (Map.Entry<String, Double> entry :
                categoryTotals.entrySet()) {

            result.add(
                    new AnalyticsResponse.CategoryAnalytics(
                            entry.getKey(),
                            entry.getValue(),
                            colors[colorIndex % colors.length]
                    )
            );

            colorIndex++;
        }

        return result;
    }

    private List<AnalyticsResponse.WeeklyAnalytics> createWeeklyData(
            List<Transaction> transactions) {

        Map<String, Double> weeklyTotals =
                new LinkedHashMap<>();

        for (int i = 1; i <= 5; i++) {
            weeklyTotals.put(
                    "Week " + i,
                    0.0
            );
        }

        LocalDate today = LocalDate.now();

        LocalDate monthStart =
                today.withDayOfMonth(1);

        for (Transaction transaction : transactions) {

            if (!"expense".equalsIgnoreCase(
                    transaction.getType())) {
                continue;
            }

            if (transaction.getDate().isBefore(monthStart)) {
                continue;
            }

            int weekNumber =
                    ((transaction.getDate().getDayOfMonth() - 1) / 7) + 1;

            weekNumber = Math.min(weekNumber, 5);

            String week =
                    "Week " + weekNumber;

            weeklyTotals.merge(
                    week,
                    transaction.getAmount(),
                    Double::sum
            );
        }

        List<AnalyticsResponse.WeeklyAnalytics> result =
                new ArrayList<>();

        for (Map.Entry<String, Double> entry :
                weeklyTotals.entrySet()) {

            result.add(
                    new AnalyticsResponse.WeeklyAnalytics(
                            entry.getKey(),
                            entry.getValue()
                    )
            );
        }

        return result;
    }
}
