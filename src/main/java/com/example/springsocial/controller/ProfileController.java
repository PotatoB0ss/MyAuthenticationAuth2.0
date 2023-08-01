package com.example.springsocial.controller;

import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.repository.UserService;
import com.example.springsocial.security.CustomUserDetailsService;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.util.ChangePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@Controller
public class ProfileController {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;


    @GetMapping(path ="/user/password-change")
    public String reset(){
        return "userProfile/passwordChange";
    }
    @PostMapping(path ="/user/password-change")
    @ResponseBody
    public ApiResponse changePassword(HttpServletRequest request, @Valid @RequestBody ChangePasswordRequest data){

        UserDetails userDetails = null;

        String jwt = getJwtFromRequest(request);
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Long userId = tokenProvider.getUserIdFromToken(jwt);
            userDetails = customUserDetailsService.loadUserById(userId);
        } else {
            throw new IllegalStateException("Некорректный токен");
        }

        if(userService.loadUserByEmail(userDetails.getUsername()).get().getProviderId() != null){
            throw new IllegalStateException("Вы не можете изменить пароль так как авторизованы с помощью Google/Github");
        }



        Authentication authentication;
        assert userDetails != null;
        authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(),
                        data.getOldPassword()
                )
        );

        if(authentication != null){
            userService.updateUser(data.getNewPassword(), userDetails.getUsername());
        }

        return new ApiResponse(true, "Вы успешно изменили свой пароль");
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
