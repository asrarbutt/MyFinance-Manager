package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.service.UserServiceImp;
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
    public void registerNewUser(@RequestBody User user) {

        userServiceImp.registerNewUser(user);

    }
}
