package com.example.expensesstracker.dto;

public class MonthlyOverviewResponse {

    private String month;
    private double income;
    private double expenses;

    public MonthlyOverviewResponse(
            String month,
            double income,
            double expenses
    ) {
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