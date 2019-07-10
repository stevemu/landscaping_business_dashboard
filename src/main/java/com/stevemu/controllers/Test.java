package com.stevemu.controllers;

import com.stevemu.repositories.MessageRepository;
import com.stevemu.security.jwt.JwtTokenProvider;
import com.stevemu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/test")
public class Test {

    // username: refreshToken
    private HashMap<String, String> refreshTokens = new HashMap<String, String>();

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

//    @PostMapping("/test1")
//    public ResponseEntity test1() {
//
//        Map<Object, Object> model = new HashMap<>();
//
//        List<Message> messageList = (List<Message>) messageRepository.findAll();
//
//        return ok(messageList);
//
//    }

//    @RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = "application/json")
//    public @ResponseBody ResponseEntity getNameJSON(@PathVariable String name) {
//
//        Map<Object, Object> model = new HashMap<>();
//
//        model.put("name", name);
//        return ok(model);
//
//    }

}
