package com.example.springsocial.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
public class OAuth2Controller {


    @GetMapping("/oauth2/redirect")
    public String oAuth2Request(@RequestParam("token") String token, HttpServletResponse httpServletResponse){
        if(token != null){
            Cookie cookie = new Cookie("accessToken", token);
            cookie.setPath("/");
            int maxAge = 7 * 24 * 60 * 60; // 7 days
            cookie.setMaxAge(maxAge);
            httpServletResponse.addCookie(cookie);
            return "redirect:/";
        }
        return "redirect:/error";
    }

}
