package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.UserDto;
import capstone.myfinancemanager.manager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth/")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerNewUser(@Valid @RequestBody UserDto newUserDto) {

        User registerNewUser = userService.registerNewUser(newUserDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(buildNewUserDto(registerNewUser.getEmail(), registerNewUser.getName(), registerNewUser.getPassword(), registerNewUser.getPassword()));

    }

    @GetMapping("/login")
    String login() {
        return getUsername();
    }

    @GetMapping("/me")
    String getUsername() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }


    public UserDto buildNewUserDto(String email, String name, String password, String repeatPassword) {
        return UserDto.builder()
                .email(email)
                .name(name)
                .password(password)
                .repeatPassword(repeatPassword)
                .build();
    }


}
