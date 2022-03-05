package com.example.ejbass.entity;

import com.example.ejbass.enums.TractionStatus;
import lombok.*;

import javax.persistence.Table;

@Getter
@Setter
@Table(name = "fund_transfer")
public class FundTransfer {
    private Integer id;
    private String fromAccount;
    private String toAccount;
    private double amount;
    private TractionStatus tractionStatus;
}
