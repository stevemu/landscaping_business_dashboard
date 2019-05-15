package com.stevemu.api;

import com.fasterxml.uuid.Generators;
import com.stevemu.api.core.AuthenticationRequest;
import com.stevemu.api.core.RefreshTokenRequest;
import com.stevemu.security.jwt.JwtTokenProvider;
import com.stevemu.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/auth")
public class Auth {

    // username: refreshToken
    private HashMap<String, String> refreshTokens = new HashMap<String, String>();

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    UserRepository users;

    @PostMapping("/renew")
    public ResponseEntity renew(@RequestBody RefreshTokenRequest data) {

        Map<Object, Object> model = new HashMap<>();

        // get username
        // for now, pretend it is s
        String username = data.getUsername();
        String refreshToken = data.getRefreshToken();

        if (refreshTokens.get(refreshToken) == null) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        // check if the refreshToken is for this username
        if (refreshTokens.get(refreshToken).equals(username)) {
            // generate a new access token for this user
            String token = jwtTokenProvider.createToken(username, this.users.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found")).getRoles());

            model.put("token", token);
            return ok(model);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);



    }

    @PostMapping("/signin")
    public ResponseEntity signin(@RequestBody AuthenticationRequest data) {

        try {
            String username = data.getUsername();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            String token = jwtTokenProvider.createToken(username, this.users.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found")).getRoles());

            // generate a refreshToken
            UUID refreshToken = Generators.randomBasedGenerator().generate();

            // store the refreshToken the username
            refreshTokens.put(refreshToken.toString(), username);

            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            model.put("refreshToken", refreshToken);

            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
}
