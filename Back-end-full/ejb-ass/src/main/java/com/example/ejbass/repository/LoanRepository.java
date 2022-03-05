package com.example.ejbass.repository;

import com.example.ejbass.entity.Account;
import com.example.ejbass.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
    Loan findFirstByAccount(Account account);
}
