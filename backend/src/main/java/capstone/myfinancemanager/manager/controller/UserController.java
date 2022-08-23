package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.UserDto;
import capstone.myfinancemanager.manager.service.UserServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth/register")
public class UserController {
    private final UserServiceImp userServiceImp;

    public UserController(UserServiceImp userServiceImp) {
        this.userServiceImp = userServiceImp;
    }

    @PostMapping
    public ResponseEntity<UserDto> registerNewUser(@RequestBody UserDto newUserDto) {

        User registerNewUser = userServiceImp.registerNewUser(newUserDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(buildNewUserDto(registerNewUser.getEmail(), registerNewUser.getName(), registerNewUser.getPassword(), registerNewUser.getPassword()));

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
