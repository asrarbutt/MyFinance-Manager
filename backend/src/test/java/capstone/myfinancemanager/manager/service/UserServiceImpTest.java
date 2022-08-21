package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.dto.UserDto;
import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.respository.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceImpTest {
    private final UserRepo userRepo = mock(UserRepo.class);
    private final UserServiceImp userServiceImp = new UserServiceImp(userRepo);
    private final UserDto newUserDto = new UserDto("testuser@test.com", "testusername", "test-password", "test-password");
    private final User registeredUser = User.builder()
            .email(newUserDto.getEmail())
            .name(newUserDto.getName())
            .password(newUserDto.getPassword())
            .build();

    private final UserDto userWithNotMatchPassword = new UserDto("testuser@test.com", "testusername", "test-password", "test-password1");

    @Test
    void shouldCreateUser() {
        //When
        when(userRepo.save(any(User.class))).thenReturn(registeredUser);
        User actual = userServiceImp.registerNewUser(newUserDto);

        //Then
        Assertions.assertEquals(
                registeredUser.getEmail(), actual.getEmail());
    }

    @Test
    void shouldNotCreateUser_UserExists() {

        //When
        when(userRepo.findById(newUserDto.getEmail()))
                .thenReturn(Optional.of(registeredUser));

        //Then
        UserExistsException userExistsException = assertThrows(
                UserExistsException.class,
                () -> userServiceImp.registerNewUser(newUserDto),
                "Throws Exception, if the User Exists");

        assertTrue(
                userExistsException.getMessage()
                        .contains("User Exists. Please choose another E-Mail"));
    }

    @Test
    void shouldNotCreateUser_passwordNotMatch() {

        //Then
        PasswordNotMatchException passwordNotMatchException = assertThrows(
                PasswordNotMatchException.class,
                () -> userServiceImp.registerNewUser(userWithNotMatchPassword),
                "Throws Exception, Password not match");

        assertTrue(
                passwordNotMatchException
                        .getMessage()
                        .contains("Passwords do not match"));

    }
}
