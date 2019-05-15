package com.stevemu.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface JobRepository extends CrudRepository<Job, Long> {

//    @Query("select a, b from User a join a.jobs b")
//    List<Message> getAllMessages();

}
