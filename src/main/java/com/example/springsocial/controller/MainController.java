package com.example.springsocial.controller;


import com.example.springsocial.model.User;
import com.example.springsocial.security.CustomUserDetailsService;
import com.example.springsocial.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/")
    public String home(HttpServletRequest request){
        String jwt = getJwtFromRequest(request);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);
            UserDetails userDetails = customUserDetailsService.loadUserById(userId);
        }
        return "home";
    }

    @GetMapping(path ="/reset")
    public String reset(){
        return "passwordReset/passwordRecovery";
    }





    private String getJwtFromRequest(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
