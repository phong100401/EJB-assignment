package com.example.ejbass.entity;


import com.example.ejbass.enums.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "accounts")
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String passwordHash;
    private Role role;
    private double balance;
    private String accountNumber;
    private String email;
    private String phone;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
    private Integer status;

    @OneToMany(mappedBy = "accountSender")
    Set<Transaction> transactionSet = new HashSet<>();

    @OneToMany(mappedBy = "accountReceiver")
    Set<Transaction> transactionSet1 = new HashSet<>();
}
