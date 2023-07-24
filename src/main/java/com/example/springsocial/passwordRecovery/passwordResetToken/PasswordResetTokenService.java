package com.example.springsocial.passwordRecovery.passwordResetToken;


import com.example.springsocial.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class PasswordResetTokenService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;


    public void savePasswordResetToken(PasswordResetToken passwordResetToken){
        passwordResetTokenRepository.save(passwordResetToken);
    }

    public Optional<PasswordResetToken> getPasswordResetToken(String passwordResetToken){
        return passwordResetTokenRepository.findByToken(passwordResetToken);
    }

    public int setUsed(String token){
        return passwordResetTokenRepository.updateUsed(token);
    }

    public Optional<PasswordResetToken> getTokenByUser(User user){
        return passwordResetTokenRepository.findByUser(user);
    }

    public int deleteToken(String token){
        return passwordResetTokenRepository.deleteByToken(token);
    }

}
