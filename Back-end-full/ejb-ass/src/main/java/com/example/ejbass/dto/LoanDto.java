package com.example.ejbass.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoanDto {
    private double amount;
    private double rate;
    private double tenure;
}
