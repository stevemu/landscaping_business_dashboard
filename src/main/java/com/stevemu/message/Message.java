package com.stevemu.message;

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
    Long id;

    private Long sender;
    private Long recipient;
    private Date date;
    private Blob image;
    private String text;
}
