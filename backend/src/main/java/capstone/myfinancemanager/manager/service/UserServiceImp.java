package capstone.myfinancemanager.manager.service;

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


    public User registerNewUser(User user) {

        if (userRepo.findById(user.getEmail()).isPresent()) {
            throw new UserExistsException("User Exists. Please choose another E-Mail");
        } else if (!user.getPassword().equals(user.getRepeatPassword())) {
            throw new PasswordNotMatchException("Passwords do not match");

        }
        return userRepo.save(addNewUser(user.getEmail(), user.getName(), user.getPassword()));
    }

    public User addNewUser(String email, String name, String password) {
        return User.builder()
                .email(email)
                .name(name)
                .password(password)
                .userRegistrationDate(Instant.now())
                .build();
    }

}
