package com.example.expensesstracker.service;

import com.example.expensesstracker.entity.Transaction;
import com.example.expensesstracker.entity.User;
import com.example.expensesstracker.repository.TransactionRepository;
import com.example.expensesstracker.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.expensesstracker.dto.TransactionResponse;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(
            TransactionRepository transactionRepository,
            UserRepository userRepository) {

        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public Transaction createTransaction(Transaction transaction) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        transaction.setUser(user);

        return transactionRepository.save(transaction);
    }
    public List<TransactionResponse> getMyTransactions() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return transactionRepository.findByUser(user)
                .stream()
                .map(transaction -> new TransactionResponse(
                        transaction.getId(),
                        transaction.getType(),
                        transaction.getTitle(),
                        transaction.getAmount(),
                        transaction.getCategory(),
                        transaction.getMethod(),
                        transaction.getDate(),
                        transaction.getNotes()
                ))
                .collect(Collectors.toList());
    }

    public Transaction updateTransaction(Long id, Transaction updatedTx) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized transaction access");
        }

        existing.setType(updatedTx.getType());
        existing.setTitle(updatedTx.getTitle());
        existing.setAmount(updatedTx.getAmount());
        existing.setCategory(updatedTx.getCategory());
        existing.setMethod(updatedTx.getMethod());
        existing.setDate(updatedTx.getDate());
        existing.setNotes(updatedTx.getNotes());

        return transactionRepository.save(existing);
    }

    public void deleteTransaction(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction existing = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized transaction access");
        }

        transactionRepository.delete(existing);
    }
}