package com.example.ejbass.controller;

import com.example.ejbass.dto.AccountDto;
import com.example.ejbass.entity.Account;
import com.example.ejbass.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @RequestMapping(method = RequestMethod.POST, path = "register")
    public Account register(@RequestBody AccountDto accountDto){
        return accountService.create(accountDto);
    }

    @RequestMapping(path = "get", method = RequestMethod.GET)
    public List<Account> findAll() {
        return accountService.findAll();
    }
}
