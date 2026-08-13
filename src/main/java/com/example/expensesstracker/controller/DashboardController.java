package com.example.expensesstracker.controller;

import com.example.expensesstracker.dto.CategorySpendingResponse;
import com.example.expensesstracker.dto.DashboardResponse;
import com.example.expensesstracker.dto.MonthlyOverviewResponse;
import com.example.expensesstracker.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard() {

        DashboardResponse dashboard =
                dashboardService.getDashboard();

        return ResponseEntity.ok(dashboard);
    }
    @GetMapping("/monthly")
    public ResponseEntity<List<MonthlyOverviewResponse>> getMonthlyOverview() {

        List<MonthlyOverviewResponse> monthly =
                dashboardService.getMonthlyOverview();

        return ResponseEntity.ok(monthly);
    }
    @GetMapping("/categories")
    public ResponseEntity<List<CategorySpendingResponse>> getCategorySpending() {

        List<CategorySpendingResponse> categories =
                dashboardService.getCategorySpending();

        return ResponseEntity.ok(categories);
    }
}