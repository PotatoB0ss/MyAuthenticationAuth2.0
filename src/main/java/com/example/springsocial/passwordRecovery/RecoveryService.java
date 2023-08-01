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
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
                        new IllegalStateException("Токен не найден"));


        LocalDateTime expiredAt = passwordResetToken.getExpiresAt();

        if(expiredAt.isBefore(LocalDateTime.now())){
            throw new IllegalStateException("Токен истёк");
        }

        if(passwordResetToken.isUsed()){
            throw new IllegalStateException("Токен уже использовал");
        }

        if(!newPass1.equals(newPass2)){
            throw new IllegalStateException("Пароли не совпадают");
        }

        if(!isPasswordValid(newPass1)){
            throw new IllegalStateException("Пароль содержит недопустимые символы");
        }

        Optional<User> user = userService.loadUserByEmail(passwordResetToken.getUser().getEmail());

        String encodedPassword = passwordEncoder
                .encode(newPass1);
        user.get().setPassword(encodedPassword);
        userService.save(user.get());
        passwordResetTokenService.setUsed(token);
        return "Пароль был успешно изменён";
    }

    protected String tokenCheck(String token){
        PasswordResetToken passwordResetToken = passwordResetTokenService
                .getPasswordResetToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("Токен не найден"));

        LocalDateTime expiredAt = passwordResetToken.getExpiresAt();

        if(expiredAt.isBefore(LocalDateTime.now())){
            return "Токен истёк";
        }

        if(passwordResetToken.isUsed()){
            return "Токен уже использован";
        }


        return "the token is correct";
    }

    public static boolean isPasswordValid(String password) {
        // Регулярное выражение для проверки отсутствия специальных символов
        String specialCharsRegex = "[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]";

        // Создаем Pattern объект для регулярного выражения
        Pattern pattern = Pattern.compile(specialCharsRegex);

        // Создаем Matcher объект для проверки строки пароля
        Matcher matcher = pattern.matcher(password);

        // Проверяем, что в пароле нет специальных символов
        return !matcher.find();
    }

}
