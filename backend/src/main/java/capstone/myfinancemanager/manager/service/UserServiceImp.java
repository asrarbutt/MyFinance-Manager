package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.dto.UserDto;
import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.respository.UserRepo;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class UserServiceImp {

    private final UserRepo userRepo;


    public UserServiceImp(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User registerNewUser(UserDto userDto) {

        if (userRepo.findById(userDto.getEmail()).isPresent()) {
            throw new UserExistsException("User Exists. Please choose another E-Mail");
        } else if (!userDto.getPassword().equals(userDto.getRepeatPassword())) {
            throw new PasswordNotMatchException("Passwords do not match");
        }

        User user = new User(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setUserRegistrationDate(Instant.now());

        return userRepo.save(user);
    }
}

