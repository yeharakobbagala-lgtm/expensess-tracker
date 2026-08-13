package com.example.expensesstracker.dto;

import java.time.LocalDate;

public class TransactionResponse {

    private Long id;
    private String type;
    private String title;
    private Double amount;
    private String category;
    private String method;
    private LocalDate date;
    private String notes;

    public TransactionResponse(
            Long id,
            String type,
            String title,
            Double amount,
            String category,
            String method,
            LocalDate date,
            String notes) {

        this.id = id;
        this.type = type;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.method = method;
        this.date = date;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public Double getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public String getMethod() {
        return method;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getNotes() {
        return notes;
    }
}
