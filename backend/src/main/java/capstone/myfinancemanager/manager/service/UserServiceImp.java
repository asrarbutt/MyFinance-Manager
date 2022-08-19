package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.respository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class UserServiceImp {

    private final UserRepo userRepo;


    public UserServiceImp(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    public User registerNewUser(User user) {

        if (userRepo.findById(user.getEmail()).isPresent()) {
            throw new UserExistsException(HttpStatus.BAD_REQUEST, "User Exists. Please choose another E-Mail");
        } else if (!user.getPassword().equals(user.getRepeatPassword())) {
            throw new PasswordNotMatchException(HttpStatus.BAD_REQUEST, "Passwords do not match");

        }
        return userRepo.save(addNewUser(user.getEmail(), user.getName(), user.getPassword(), user.getRepeatPassword()));
    }

    public User addNewUser(String email, String name, String password, String repeatPassword) {
        return User.builder()
                .email(email)
                .name(name)
                .password(password)
                .repeatPassword(repeatPassword)
                .userRegistrationDate(Instant.now())
                .build();
    }

}
