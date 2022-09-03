package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.UserDto;
import capstone.myfinancemanager.manager.respository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final Timestamp timestamp;

    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepo userRepo, Timestamp timestamp, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.timestamp = timestamp;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerNewUser(UserDto userDto) {

        if (userRepo.findById(userDto.getEmail()).isPresent()) {
            throw new UserExistsException("User Exists. Please choose another E-Mail");
        } else if (!userDto.getPassword().equals(userDto.getRepeatPassword())) {
            throw new PasswordNotMatchException("Passwords do not match");
        }

        User user = new User(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUserRegistrationDate(timestamp.now());

        return userRepo.save(user);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepo.findById(username);
    }
}

