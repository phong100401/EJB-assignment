package com.example.ejbass.controller;


import com.example.ejbass.dto.TransactionDto;
import com.example.ejbass.entity.Transaction;
import com.example.ejbass.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/transactions")
@CrossOrigin("*")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @RequestMapping(path="create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody TransactionDto transactionDto) {
        Transaction transaction = transactionService.create(transactionDto);

        return new ResponseEntity<>(transaction, HttpStatus.CREATED);
    }

    @RequestMapping(path="get", method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        List<Transaction> transactionList = transactionService.findAll();

        return new ResponseEntity<>(transactionList, HttpStatus.CREATED);
    }
}
