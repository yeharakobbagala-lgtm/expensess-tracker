package com.example.expensesstracker.dto;

public class DashboardResponse {

    private Double totalBalance;
    private Double totalIncome;
    private Double totalExpenses;

    public DashboardResponse(
            Double totalBalance,
            Double totalIncome,
            Double totalExpenses) {

        this.totalBalance = totalBalance;
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
    }

    public Double getTotalBalance() {
        return totalBalance;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public Double getTotalExpenses() {
        return totalExpenses;
    }
}
