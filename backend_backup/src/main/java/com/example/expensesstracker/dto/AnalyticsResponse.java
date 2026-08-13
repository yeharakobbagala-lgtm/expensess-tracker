package com.example.expensesstracker.dto;

import java.util.List;

public class AnalyticsResponse {

    private List<MonthlyAnalytics> monthlyData;
    private List<CategoryAnalytics> categorySpending;
    private List<WeeklyAnalytics> weeklyData;

    public AnalyticsResponse(
            List<MonthlyAnalytics> monthlyData,
            List<CategoryAnalytics> categorySpending,
            List<WeeklyAnalytics> weeklyData) {

        this.monthlyData = monthlyData;
        this.categorySpending = categorySpending;
        this.weeklyData = weeklyData;
    }

    public List<MonthlyAnalytics> getMonthlyData() {
        return monthlyData;
    }

    public List<CategoryAnalytics> getCategorySpending() {
        return categorySpending;
    }

    public List<WeeklyAnalytics> getWeeklyData() {
        return weeklyData;
    }

    public static class MonthlyAnalytics {

        private String month;
        private double income;
        private double expenses;

        public MonthlyAnalytics(
                String month,
                double income,
                double expenses) {

            this.month = month;
            this.income = income;
            this.expenses = expenses;
        }

        public String getMonth() {
            return month;
        }

        public double getIncome() {
            return income;
        }

        public double getExpenses() {
            return expenses;
        }
    }

    public static class CategoryAnalytics {

        private String name;
        private double value;
        private String color;

        public CategoryAnalytics(
                String name,
                double value,
                String color) {

            this.name = name;
            this.value = value;
            this.color = color;
        }

        public String getName() {
            return name;
        }

        public double getValue() {
            return value;
        }

        public String getColor() {
            return color;
        }
    }

    public static class WeeklyAnalytics {

        private String week;
        private double amount;

        public WeeklyAnalytics(
                String week,
                double amount) {

            this.week = week;
            this.amount = amount;
        }

        public String getWeek() {
            return week;
        }

        public double getAmount() {
            return amount;
        }
    }
}