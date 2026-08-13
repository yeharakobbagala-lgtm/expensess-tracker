package com.example.expensesstracker.service;

import com.example.expensesstracker.dto.GoalResponse;
import com.example.expensesstracker.entity.Goal;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.repository.GoalRepository;
import com.example.expensesstracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(
            GoalRepository goalRepository,
            UserRepository userRepository) {

        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    public GoalResponse createGoal(Goal goal) {

        User user = getCurrentUser();

        goal.setUser(user);

        Goal savedGoal = goalRepository.save(goal);

        return new GoalResponse(
                savedGoal.getId(),
                savedGoal.getTitle(),
                savedGoal.getTarget(),
                savedGoal.getCurrent(),
                savedGoal.getDeadline(),
                savedGoal.getIcon(),
                savedGoal.getColor()
        );
    }

    public List<GoalResponse> getMyGoals() {

        User user = getCurrentUser();

        return goalRepository.findByUser(user)
                .stream()
                .map(goal -> new GoalResponse(
                        goal.getId(),
                        goal.getTitle(),
                        goal.getTarget(),
                        goal.getCurrent(),
                        goal.getDeadline(),
                        goal.getIcon(),
                        goal.getColor()
                ))
                .toList();
    }

    public GoalResponse updateGoal(Long id, Goal updatedGoal) {

        User user = getCurrentUser();

        Goal existing = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Unauthorized goal access"
            );
        }

        existing.setTitle(updatedGoal.getTitle());
        existing.setTarget(updatedGoal.getTarget());
        existing.setCurrent(updatedGoal.getCurrent());
        existing.setDeadline(updatedGoal.getDeadline());
        existing.setIcon(updatedGoal.getIcon());
        existing.setColor(updatedGoal.getColor());

        Goal savedGoal = goalRepository.save(existing);

        return new GoalResponse(
                savedGoal.getId(),
                savedGoal.getTitle(),
                savedGoal.getTarget(),
                savedGoal.getCurrent(),
                savedGoal.getDeadline(),
                savedGoal.getIcon(),
                savedGoal.getColor()
        );
    }

    public void deleteGoal(Long id) {

        User user = getCurrentUser();

        Goal existing = goalRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException(
                    "Unauthorized goal access"
            );
        }

        goalRepository.delete(existing);
    }
}
