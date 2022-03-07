package com.example.ejbass.controller;

import com.example.ejbass.dto.LoanDto;
import com.example.ejbass.entity.Account;
import com.example.ejbass.entity.Loan;
import com.example.ejbass.service.AccountService;
import com.example.ejbass.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1/loans")
@CrossOrigin("*")
public class LoanController {
    @Autowired
    private LoanService loanService;

    @Autowired
    private AccountService accountService;

    @RequestMapping(path = "create", method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody LoanDto loanDto) {
        Loan loan = loanService.create(loanDto);
        HashMap<String, Date> response = new HashMap<>();
        response.put("approvedDate", loan.getApprovedDate());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @RequestMapping(path = "approve", method = RequestMethod.POST)
    public ResponseEntity<Object> approve(@RequestBody LoanDto loanDto) {
        Loan loan = loanService.create(loanDto);
        HashMap<String, Date> response = new HashMap<>();
        response.put("approvedDate", loan.getApprovedDate());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        List<Loan> loanList = loanService.findAll();

        return new ResponseEntity<>(loanList, HttpStatus.OK);
    }


    //Công thức đỉnh cao tính khoản thanh toán hàng tháng
    @RequestMapping(path = "calculate", method = RequestMethod.POST)
    public ResponseEntity<Object> calculate(Principal principal) {
        String username = principal.getName();
        Account loggedInAccount = accountService.findByUserName(username).orElse(null);

        Loan existedLoan = loanService.findByAccount(loggedInAccount);

        double amount = existedLoan.getAmount();
        double tenure = existedLoan.getTenure();
        double rate = existedLoan.getRate() / (100 * 12);

        double exponential = Math.pow((1 + rate), tenure);

        double amountPerMonth = amount * (rate * exponential / (exponential - 1));

        return new ResponseEntity<>(amountPerMonth, HttpStatus.OK);
    }
}
