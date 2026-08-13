package com.example.expensesstracker.dto;

public class CategorySpendingResponse {

    private String category;
    private double amount;

    public CategorySpendingResponse(
            String category,
            double amount
    ) {
        this.category = category;
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public double getAmount() {
        return amount;
    }
}