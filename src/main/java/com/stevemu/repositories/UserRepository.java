package com.stevemu.repositories;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.lang.Nullable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Optional<User> findByUsername(String username);

//    @Nullable
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    User findByUsername(String username);

    List<User> findAllByOrderByRolesAscFirstNameAsc();
    List<User> findAllByOrderByRatingDesc();

}
