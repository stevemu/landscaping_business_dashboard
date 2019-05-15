package com.stevemu;

import com.stevemu.repositories.*;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
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
    private JobRepository jobRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Override
    public void run(String... args) throws Exception {

        createObjs();
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

//    @Transactional
    public void createObjs() {
        User admin = User.builder()
                .username("a")
                .firstName("Qi")
                .lastName("Mu")
                .password(this.passwordEncoder.encode("p"))
                .roles(Arrays.asList("ROLE_ADMIN"))
                .build();
        userRepository.save(admin);

        User worker1 = User.builder()
                .username("worker1")
                .firstName("Worker1")
                .lastName("Harrison")
                .phone("7188641267")
                .rating(5)
                .password(this.passwordEncoder.encode("password"))
                .roles(Arrays.asList("ROLE_WORKER"))
                .build();
        userRepository.save(worker1);

        User customer1 = User.builder()
                .username("customer1")
                .firstName("Cus1")
                .lastName("Ben")
                .password(this.passwordEncoder.encode("password"))
                .roles(Arrays.asList("ROLE_CUSTOMER"))
                .build();
        userRepository.save(customer1);

//        User customer2 = User.builder()
//                .username("customer2")
//                .firstName("Jane2")
//                .lastName("Doe")
//                .password(this.passwordEncoder.encode("password"))
//                .roles(Arrays.asList("ROLE_CUSTOMER"))
//                .build();
//        userRepository.save(customer2);

        Message m1 = Message.builder()
                .date(new Date())
                .text("hello, I am admin")
                .sender(admin)
                .recipient(worker1)
                .build();
        messageRepository.save(m1);

        Message m2 = Message.builder()
                .date(new Date())
                .text("hello back, I am worker 1")
                .sender(worker1)
                .recipient(admin)
                .build();
        messageRepository.save(m2);

        List<User> job1users = new ArrayList<>();
        job1users.add(worker1);
        job1users.add(customer1);

        Job job1 = Job.builder()
                .title("job1")
                .users(job1users)
                .build();
        jobRepository.save(job1);

        worker1.getJobs().add(job1);
        userRepository.save(worker1);
        customer1.getJobs().add(job1);
        userRepository.save(customer1);



    }
}
