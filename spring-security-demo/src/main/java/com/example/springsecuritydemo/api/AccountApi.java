package com.example.springsecuritydemo.api;

import com.example.springsecuritydemo.dto.AccountDto;
import com.example.springsecuritydemo.entity.Account;
import com.example.springsecuritydemo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/accounts")
public class AccountApi {

    @Autowired
    AccountService accountService;

    @RequestMapping(method = RequestMethod.POST, path="register")
    public Account register(@RequestBody AccountDto accountDto) {
        return accountService.create(accountDto);
    }
}
