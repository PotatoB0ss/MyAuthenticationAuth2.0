package com.example.springsocial.passwordRecovery;

import com.example.springsocial.captcha.RecaptchaService;
import com.example.springsocial.repository.UserService;
import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(path = "/auth")
@AllArgsConstructor
public class RecoveryController {

    private final RecoveryService recoveryService;
    private final UserService userService;
    private final RecaptchaService recaptchaService;


    @PostMapping(path = "/reset")
    public String reset(@RequestParam("email") String email, @RequestParam("recaptchaResponse") String recaptchaResponse){
        boolean isValidRecaptcha = recaptchaService.verifyRecaptcha(recaptchaResponse);
        if (isValidRecaptcha) {
            return userService.resetUserPassword(email);
        } else {
            return "Error: incorrect reCAPTCHA";
        }
    }

    @GetMapping(path = "/resetPass")
    public ModelAndView passwordReset(@RequestParam("token") String token, Model model){
        String result = recoveryService.tokenCheck(token);
        if(result.equals("the token is correct")){
            return new ModelAndView("passwordReset/newPasswordInput");
        }
        model.addAttribute("reason", recoveryService.tokenCheck(token));
        return new ModelAndView("passwordReset/resetEmailPassWrong");
    }

    @PostMapping(path = "/resetPass")
    public String passwordReset(@RequestParam("token") String token,
                                @RequestParam("newPass1") String newPass1,
                                @RequestParam("newPass2") String newPass2){
        return recoveryService.passwordReset(token, newPass1, newPass2);
    }


}
