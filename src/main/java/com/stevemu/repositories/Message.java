package com.stevemu.repositories;

import com.stevemu.repositories.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Blob;
import java.util.Date;

@Entity
@Table(name="messages")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User recipient;

    @Column(name="message_date")
    private Date date;

    private Blob image;
    private String text;
}
