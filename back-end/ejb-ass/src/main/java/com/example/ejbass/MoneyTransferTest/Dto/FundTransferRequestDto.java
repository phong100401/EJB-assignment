package com.example.ejbasmtest.MoneyTransferTest.Dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FundTransferRequestDto {
    private String fromAccount;
    private String toAccount;
    private BigDecimal amount;
    private String authID;
}
