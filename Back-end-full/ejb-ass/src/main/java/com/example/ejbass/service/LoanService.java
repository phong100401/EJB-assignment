package com.example.ejbass.service;

import com.example.ejbass.dto.LoanDto;
import com.example.ejbass.entity.Account;
import com.example.ejbass.entity.Loan;
import com.example.ejbass.repository.AccountRepository;
import com.example.ejbass.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<Loan> findAll(){
        return loanRepository.findAll();
    }

    public Loan findByAccount(Account account){
        return loanRepository.findFirstByAccount(account);
    }
    public Loan create(LoanDto loanDto) {
        // lấy approvedDate = today + 3 days;
        Date approvedDate;
        Calendar currentTime = Calendar.getInstance(); //Trả về phiên bản với ngày và giờ hiện tại được đặt
        currentTime.add(Calendar.DATE, 3);
        approvedDate = currentTime.getTime();

        // lấy ra username từ authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        Account account = accountRepository.findFirstByUsername(currentPrincipalName).orElse(null);

        // set thêm balance cho user khi loan được tạo

        Loan loan = new Loan();
        loan.setAmount(loanDto.getAmount());
        loan.setRate(loanDto.getRate());
        loan.setTenure(loanDto.getTenure());
        loan.setStatus(1);
        loan.setApprovedDate(approvedDate);
        loan.setAccount(account);

        return loanRepository.save(loan);
    }
}
