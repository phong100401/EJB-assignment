package com.example.springsecuritydemo.repository;

import com.example.springsecuritydemo.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findFirstByUsername(String username);
}
