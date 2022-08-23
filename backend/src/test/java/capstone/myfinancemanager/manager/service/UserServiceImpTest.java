package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.UserDto;
import capstone.myfinancemanager.manager.respository.UserRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceImpTest {
    private final UserRepo userRepo = mock(UserRepo.class);
    private final Timestamp timestampService = mock(Timestamp.class);
    private final UserServiceImp userServiceImp = new UserServiceImp(userRepo, timestampService);
    private final UserDto newUserDto = new UserDto("testuser@test.com", "testusername", "test-password", "test-password");
    private final User registeredUserWithDate = User.builder()
            .email(newUserDto.getEmail())
            .name(newUserDto.getName())
            .password(newUserDto.getPassword())
            .userRegistrationDate(Instant.parse("2022-08-23T09:22:41.255023Z"))
            .build();

    private final UserDto userWithNotMatchPassword = new UserDto("testuser@test.com", "testusername", "test-password", "test-password1");

    @Test
    void shouldCreateUser() {

        //When
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(userRepo.save(registeredUserWithDate)).thenReturn(registeredUserWithDate);

        User actual = userServiceImp.registerNewUser(newUserDto);

        //Then
        Assertions.assertEquals(
                registeredUserWithDate, actual);
    }

    @Test
    void shouldNotCreateUser_UserExists() {

        //When
        when(userRepo.findById(newUserDto.getEmail()))
                .thenReturn(Optional.of(registeredUserWithDate));

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
