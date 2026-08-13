package com.example.expensesstracker.controller;

import com.example.expensesstracker.dto.AnalyticsResponse;
import com.example.expensesstracker.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalytics(
            @RequestParam(defaultValue = "month") String range) {

        AnalyticsResponse analytics =
                analyticsService.getAnalytics(range);

        return ResponseEntity.ok(analytics);
    }
}
