package com.example.ejbass.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {
    private String username;
    private String password;
    private String confirmPassword;
    private String accountNumber;
    private String email;
    private String phone;
}
