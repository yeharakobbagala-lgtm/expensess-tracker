package com.example.expensesstracker.controller;

import com.example.expensesstracker.dto.TransactionResponse;
import com.example.expensesstracker.entity.Transaction;
import com.example.expensesstracker.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction) {

        Transaction savedTransaction =
                transactionService.createTransaction(transaction);

        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getMyTransactions() {

        List<TransactionResponse> transactions =
                transactionService.getMyTransactions();

        return ResponseEntity.ok(transactions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transaction) {

        Transaction updated = transactionService.updateTransaction(id, transaction);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}