package com.stevemu.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Optional<User> findByUsername(String username);

    List<User> findAllByOrderByRolesAscFirstNameAsc();
}
