package com.example.ejbass.service;

import com.example.ejbass.dto.AccountDto;
import com.example.ejbass.entity.Account;
import com.example.ejbass.enums.Role;
import com.example.ejbass.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Account create(AccountDto accountDto){
        Account account = new Account();
        account.setUsername(accountDto.getUsername());
        account.setPasswordHash(passwordEncoder.encode(accountDto.getPassword()));
        account.setBalance(100000);
        account.setRole(Role.USER);
        account.setAccountNumber(accountDto.getAccountNumber());
        account.setEmail(accountDto.getEmail());
        account.setPhone(accountDto.getPhone());

        return accountRepository.save(account);
    }

    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    public Optional<Account> findByUserName(String username) {
        return accountRepository.findFirstByUsername(username);
    }
}
