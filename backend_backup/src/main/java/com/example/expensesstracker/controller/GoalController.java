package com.example.expensesstracker.controller;

import com.example.expensesstracker.dto.GoalResponse;
import com.example.expensesstracker.entity.Goal;
import com.example.expensesstracker.service.GoalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @PostMapping
    public ResponseEntity<GoalResponse> createGoal(
            @RequestBody Goal goal) {

        GoalResponse savedGoal =
                goalService.createGoal(goal);

        return ResponseEntity.ok(savedGoal);
    }

    @GetMapping
    public ResponseEntity<List<GoalResponse>> getMyGoals() {

        List<GoalResponse> goals =
                goalService.getMyGoals();

        return ResponseEntity.ok(goals);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalResponse> updateGoal(
            @PathVariable Long id,
            @RequestBody Goal goal) {

        GoalResponse updated =
                goalService.updateGoal(id, goal);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(
            @PathVariable Long id) {

        goalService.deleteGoal(id);

        return ResponseEntity.noContent().build();
    }
}
