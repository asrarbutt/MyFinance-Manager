package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.exceptions.PasswordNotMatchException;
import capstone.myfinancemanager.manager.exceptions.UserExistsException;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.UserDto;
import capstone.myfinancemanager.manager.respository.UserRepo;
import capstone.myfinancemanager.manager.security.AppUserDetailsService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {


    private final UserRepo userRepo = mock(UserRepo.class);

    AppUserDetailsService appUserDetailsService = new AppUserDetailsService(userRepo);
    private final Timestamp timestampService = mock(Timestamp.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final UserService userService = new UserService(userRepo, timestampService, passwordEncoder);
    private final UserDto newUserDto = new UserDto("testuser@test.com", "testusername", "test-password", "test-password");
    private final User registeredUserWithDate = User.builder()
            .email(newUserDto.getEmail())
            .name(newUserDto.getName())
            .password("password_encode")
            .userRegistrationDate(Instant.parse("2022-08-23T09:22:41.255023Z"))
            .build();

    private final UserDto userWithNotMatchPassword = new UserDto("testuser@test.com", "testusername", "test-password", "test-password1");

    @Test
    void shouldCreateUser() {

        //When
        when(passwordEncoder.encode(newUserDto.getPassword())).thenReturn("password_encode");
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(userRepo.save(registeredUserWithDate)).thenReturn(registeredUserWithDate);

        User actual = userService.registerNewUser(newUserDto);

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
                () -> userService.registerNewUser(newUserDto),
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
                () -> userService.registerNewUser(userWithNotMatchPassword),
                "Throws Exception, Password not match");

        assertTrue(
                passwordNotMatchException
                        .getMessage()
                        .contains("Passwords do not match"));

    }

    @Test
    void shouldNotCreateUser_givenUsernameExists() {

        //when
        when(userRepo.findAll()).thenReturn(List.of(registeredUserWithDate));
        when(userRepo.findById(newUserDto.getEmail())).thenReturn(Optional.of(registeredUserWithDate));
        UserExistsException exception = assertThrows(UserExistsException.class, () -> {
            userService.registerNewUser(newUserDto);
        });

        //then
        assertEquals("User Exists. Please choose another E-Mail", exception.getMessage());

    }


    @Test
    void loadUserByUsername_UserExistsTest() {
        //given
        //When
        when(passwordEncoder.encode(newUserDto.getPassword())).thenReturn("password_encode");
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(userRepo.save(registeredUserWithDate)).thenReturn(registeredUserWithDate);
        when(userRepo.findById(newUserDto.getEmail())).thenReturn(Optional.of(registeredUserWithDate));

        String actualUsername = appUserDetailsService.loadUserByUsername(newUserDto.getEmail()).getUsername();


        //then
        Assertions.assertEquals(newUserDto.getEmail(), actualUsername);
        //then

    }
}
