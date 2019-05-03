package com.stevemu;

import com.stevemu.user.User;
import com.stevemu.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Autowired
    public DatabaseLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        List<User> users = Arrays.asList(
                User.builder()
                        .username("s")
                        .firstName("Qi")
                        .lastName("Mu")
                        .password(this.passwordEncoder.encode("p"))
                        .roles(Arrays.asList("ROLE_ADMIN"))
                        .build(),
                User.builder()
                        .username("r")
                        .firstName("Roger")
                        .lastName("Dunn")
                        .password(this.passwordEncoder.encode("p"))
                        .roles(Arrays.asList("ROLE_ADMIN"))
                        .build(),

                User.builder()
                        .username("johndoe")
                        .firstName("John")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_WORKER"))
                        .build(),
                User.builder()
                        .username("johndoe2")
                        .firstName("Aramb")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_WORKER"))
                        .build(),
                User.builder()
                        .username("johndoe3")
                        .firstName("Zeoo")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_WORKER"))
                        .build(),

                User.builder()
                        .username("janedoe")
                        .firstName("Jane1")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_CUSTOMER"))
                        .build(),
                User.builder()
                        .username("janedoe2")
                        .firstName("Jane2")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_CUSTOMER"))
                        .build(),
                User.builder()
                        .username("janedoe3")
                        .firstName("Jane3")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_CUSTOMER"))
                        .build()
        );


        userRepository.saveAll(users);
    }
}
