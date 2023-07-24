package com.example.springsocial.passwordRecovery;



import com.example.springsocial.model.User;
import com.example.springsocial.passwordRecovery.passwordResetToken.PasswordResetToken;
import com.example.springsocial.passwordRecovery.passwordResetToken.PasswordResetTokenService;
import com.example.springsocial.repository.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecoveryService {

    private final PasswordResetTokenService passwordResetTokenService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public String passwordReset(String token, String newPass1, String newPass2){
        PasswordResetToken passwordResetToken = passwordResetTokenService
                .getPasswordResetToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));


        LocalDateTime expiredAt = passwordResetToken.getExpiresAt();

        if(expiredAt.isBefore(LocalDateTime.now())){
            throw new IllegalStateException("token expired");
        }

        if(passwordResetToken.isUsed()){
            throw new IllegalStateException("token has already used");
        }

        if(!newPass1.equals(newPass2)){
            throw new IllegalStateException("password mismatch");
        }

        Optional<User> user = userService.loadUserByEmail(passwordResetToken.getUser().getEmail());

        String encodedPassword = passwordEncoder
                .encode(newPass1);
        user.get().setPassword(encodedPassword);
        userService.save(user.get());
        passwordResetTokenService.setUsed(token);
        return "Password has been successfully changed";
    }

    protected String tokenCheck(String token){
        PasswordResetToken passwordResetToken = passwordResetTokenService
                .getPasswordResetToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        LocalDateTime expiredAt = passwordResetToken.getExpiresAt();

        if(expiredAt.isBefore(LocalDateTime.now())){
            return "token expired";
        }

        if(passwordResetToken.isUsed()){
            return "token has already used";
        }


        return "the token is correct";
    }

}
