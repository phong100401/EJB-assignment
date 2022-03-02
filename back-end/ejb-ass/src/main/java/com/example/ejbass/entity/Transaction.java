package com.example.ejbass.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transaction_history")
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;
    @Column(name = "senderId",insertable = false,updatable = false)
    private int senderId;
    @Column(name = "receiverId",insertable = false,updatable = false)
    private int receiverId;
    private double amount;
    private String message;
    @CreationTimestamp
    private Date createdAt;
    private String status;

    @ManyToOne
    @JoinColumn(name = "senderId", referencedColumnName = "id",nullable = false)
    @JsonIgnore
    Account accountSender;

    @ManyToOne
    @JoinColumn(name = "receiverId", referencedColumnName = "id", nullable = false)
    Account accountReceiver;




}
