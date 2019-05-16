package com.stevemu.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;

import java.util.List;

@RepositoryRestResource
public interface MessageRepository extends CrudRepository<Message, Long> {

    // use sql - works
//    @Query(value = "select * from messages where sender_id = 1", nativeQuery = true)
//    List<Message> findByUserId(@Param("userId") String userId);

    // use sql with variable - works
//    @Query(value = "select * from messages where sender_id = :userId", nativeQuery = true)
//    List<Message> findByUserId(@Param("userId") Integer userId);

    @Query("select m from Message m where m.sender.id = ?1 and m.recipient.id = ?2 or m.sender.id = ?2 and m.recipient.id = ?1")
//    @Query("select m from Message m where m.sender.id = ?1 and m.recipient.id = 2")
    List<Message> getMessagesBetweenTwoUser(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);


}
