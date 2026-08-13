package com.example.expensesstracker.dto;

public class BudgetResponse {

    private Long id;
    private String category;
    private Double limit;
    private String period;
    private Double spent;
    private Double remaining;
    private Double percentageUsed;

    public BudgetResponse(
            Long id,
            String category,
            Double limit,
            String period,
            Double spent,
            Double remaining,
            Double percentageUsed) {

        this.id = id;
        this.category = category;
        this.limit = limit;
        this.period = period;
        this.spent = spent;
        this.remaining = remaining;
        this.percentageUsed = percentageUsed;
    }

    public Long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public Double getLimit() {
        return limit;
    }

    public String getPeriod() {
        return period;
    }

    public Double getSpent() {
        return spent;
    }

    public Double getRemaining() {
        return remaining;
    }

    public Double getPercentageUsed() {
        return percentageUsed;
    }
}