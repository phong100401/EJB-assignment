package com.example.springsecuritydemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class MySecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        ApiAuthenticationFilter apiAuthenticationFilter = new ApiAuthenticationFilter(authenticationManagerBean());
        apiAuthenticationFilter.setFilterProcessesUrl("/api/v1/accounts/login");
        http.csrf().disable();
        http.authorizeHttpRequests()
                .antMatchers("/api/v1/accounts/register", "/api/v1/accounts/login").permitAll();
//        http.authorizeRequests().antMatchers("/api/v1/hello").hasAnyAuthority("ADMIN");
//        http.authorizeRequests().antMatchers("/api/v1/goodbye").hasAnyAuthority("USER");
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(apiAuthenticationFilter);
//        http.addFilterBefore(new ApiAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
