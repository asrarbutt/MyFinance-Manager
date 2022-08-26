package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.UserDto;
import capstone.myfinancemanager.manager.respository.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final Timestamp timestamp;

    public UserService(UserRepo userRepo, Timestamp timestamp) {
        this.userRepo = userRepo;
        this.timestamp = timestamp;
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
        user.setUserRegistrationDate(timestamp.now());

        return userRepo.save(user);
    }
}

