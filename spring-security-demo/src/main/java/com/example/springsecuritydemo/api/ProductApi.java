package com.example.springsecuritydemo.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/products")
public class ProductApi {

    @RequestMapping(method = RequestMethod.GET)
    public String getProduct() {
        return "Hello";
    }
}
