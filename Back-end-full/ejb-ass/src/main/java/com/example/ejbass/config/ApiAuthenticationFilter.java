package com.example.ejbass.config;

import com.auth0.jwt.JWT;
import com.example.ejbass.dto.AccountDto;
import com.example.ejbass.entity.Account;
import com.example.ejbass.service.AccountService;
import com.google.gson.Gson;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Optional;
import java.util.stream.Collectors;

public class ApiAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    
    private final AccountService accountService;

    public ApiAuthenticationFilter(AuthenticationManager authenticationManager, ApplicationContext ctx) {
        this.authenticationManager = authenticationManager;
        this.accountService = ctx.getBean(AccountService.class);
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            String jsonData = request.getReader().lines().collect(Collectors.joining());
            Gson gson = new Gson();
            // xu li login
            AccountDto accountDto = gson.fromJson(jsonData, AccountDto.class);
            UsernamePasswordAuthenticationToken userToken
                    = new UsernamePasswordAuthenticationToken(accountDto.getUsername(), accountDto.getPassword());

            return authenticationManager.authenticate(userToken);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    // login thành công => trả về access_token
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = (User) authResult.getPrincipal();
        Calendar currentTime = Calendar.getInstance();
        currentTime.add(Calendar.DATE, 7);
        String accessToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(currentTime.getTime())
                .withIssuer("t2004e_asm")
                .withClaim("role", user.getAuthorities().iterator().next().getAuthority())
                .sign(SecurityBean.algorithm());

        String username = user.getUsername().toString();

        Optional<Account> optionalAccount = accountService.findByUserName(username);
        if (!optionalAccount.isPresent()) {
            response.getWriter().println("Error");
        }

        Account account = optionalAccount.get();
        HashMap<String, String> map = new HashMap<>();
        map.put("access_token", accessToken);
        map.put("username", account.getUsername());
        map.put("email", account.getEmail());
        map.put("phone", account.getPhone());
        map.put("balance",String.valueOf(account.getBalance()));
        map.put("accountNumber",account.getAccountNumber());
        map.put("id" , String.valueOf(account.getId()));
        response.setContentType("application/json");
        response.getWriter().println(new Gson().toJson(map));
    }
}
