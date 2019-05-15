package com.stevemu;

import com.stevemu.repositories.Message;
import com.stevemu.repositories.MessageRepository;
import com.stevemu.repositories.User;
import com.stevemu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Override
    public void run(String... args) throws Exception {

        createUsers();
    }

    public void testModify() {

        // modify
//        Optional<User> admin = userRepository.findByUsername("a");
//        User admin1 = admin.get();
//
//        admin1.setFirstName("John");
//
//        userRepository.save(admin1);
//        System.out.println(admin11);
    }

    public void createUsers() {
        User admin = User.builder()
                .username("a")
                .firstName("Qi")
                .lastName("Mu")
                .password(this.passwordEncoder.encode("p"))
                .roles(Arrays.asList("ROLE_ADMIN"))
                .build();

        User worker1 = User.builder()
                .username("worker1")
                .firstName("John1")
                .lastName("Doe1")
                .phone("7188641267")
                .rating(5)
                .password(this.passwordEncoder.encode("password"))
                .roles(Arrays.asList("ROLE_WORKER"))
                .build();

        List<User> users = Arrays.asList(
                admin,

                // workers
                worker1,
                User.builder()
                        .username("worker2")
                        .firstName("Aramb")
                        .lastName("Doe")
                        .rating(3)
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_WORKER"))
                        .build(),
//                User.builder()
//                        .username("johndoe3")
//                        .firstName("Zeoo")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe4")
//                        .firstName("Zeoo1")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe5")
//                        .firstName("Zeoo2")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe6")
//                        .firstName("Zeoo3")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe7")
//                        .firstName("Zeoo4")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe8")
//                        .firstName("Zeoo5")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe9")
//                        .firstName("Zeoo6")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe10")
//                        .firstName("Zeoo10")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),
//                User.builder()
//                        .username("johndoe11")
//                        .firstName("Zeoo11")
//                        .lastName("Doe")
//                        .rating(0)
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_WORKER"))
//                        .build(),


                // customers
                User.builder()
                        .username("customer1")
                        .firstName("Jane1")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_CUSTOMER"))
                        .build(),
                User.builder()
                        .username("customer2")
                        .firstName("Jane2")
                        .lastName("Doe")
                        .password(this.passwordEncoder.encode("password"))
                        .roles(Arrays.asList("ROLE_CUSTOMER"))
                        .build()
//                User.builder()
//                        .username("janedoe3")
//                        .firstName("Jane3")
//                        .lastName("Doe")
//                        .password(this.passwordEncoder.encode("password"))
//                        .roles(Arrays.asList("ROLE_CUSTOMER"))
//                        .build()
        );

        userRepository.saveAll(users);

        List<Message> messages = Arrays.asList(
                Message.builder()
                        .date(new Date())
                        .text("hello")
                        .sender(admin)
                        .recipient(worker1)
                        .build(),
                Message.builder()
                        .date(new Date())
                        .text("hello back")
                        .sender(worker1)
                        .recipient(admin)
                        .build()
        );

        messageRepository.saveAll(messages);


    }
}
