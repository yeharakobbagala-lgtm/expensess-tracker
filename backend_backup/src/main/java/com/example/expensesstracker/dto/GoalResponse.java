package com.example.expensesstracker.dto;

import java.time.LocalDate;

public class GoalResponse {

    private Long id;
    private String title;
    private Double target;
    private Double current;
    private LocalDate deadline;
    private String icon;
    private String color;

    public GoalResponse(
            Long id,
            String title,
            Double target,
            Double current,
            LocalDate deadline,
            String icon,
            String color) {

        this.id = id;
        this.title = title;
        this.target = target;
        this.current = current;
        this.deadline = deadline;
        this.icon = icon;
        this.color = color;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Double getTarget() {
        return target;
    }

    public Double getCurrent() {
        return current;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public String getIcon() {
        return icon;
    }

    public String getColor() {
        return color;
    }
}