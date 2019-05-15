package com.stevemu.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Component;

import java.util.List;

@RepositoryRestResource
public interface MessageRepository extends CrudRepository<Message, Long> {

    // create an endpoint for getting message between two user by Ids with spring data jpa

    //    @Query("select t from Task t where t.user.id = :#{principal.id}")
    //    List<Task> findAll();

//    @Query("SELECT m FROM Message m WHERE m.sender = :#{userId}")
//    List<Message> findByUserId(@Param("userId") String userId);

    // use sql - works
//    @Query(value = "select * from messages where sender_id = 1", nativeQuery = true)
//    List<Message> findByUserId(@Param("userId") String userId);

    // use sql with variable - works
//    @Query(value = "select * from messages where sender_id = :userId", nativeQuery = true)
//    List<Message> findByUserId(@Param("userId") Integer userId);

    // use jpql with variable - works
//    @Query("select m from Message m where m.text = :text")
//    List<Message> findByMessageText(@Param("text") String text);

    // works
//    @Query("select m from Message m")
//    List<Message> getAllMessages();

    @Query("select m from Message m where m.sender.id = :user1Id and m.recipient.id = :user2Id or m.sender.id = :user2Id and m.recipient.id = :user1Id")
    List<Message> getMessagesBetweenTwoUser(@Param("user1Id") Long user1Id, @Param("user2Id") Long user2Id);



    //maybe
    // create an endpoint for getting message authed user and a user id


}
