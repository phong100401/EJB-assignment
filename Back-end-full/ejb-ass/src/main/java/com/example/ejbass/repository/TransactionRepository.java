package com.example.ejbass.repository;

import com.example.ejbass.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    @Query("select t from Transaction t where t.senderId =:senderId or t.receiverId =:senderId")
    List<Transaction> findByAccountId(int senderId);
}
