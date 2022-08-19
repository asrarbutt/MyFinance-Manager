package capstone.myfinancemanager.manager.service;

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
import static org.mockito.Mockito.*;

class UserServiceImpTest {

    private final UserRepo userRepo = mock(UserRepo.class);
    private final UserServiceImp userServiceImp = new UserServiceImp(userRepo);
    private final User expectedTestUser = userServiceImp.addNewUser("testuser@test.com", "testuser", "123456789", "123456789");
    private final User newUser = new User("testuser@test.com", "testuser", "98765431", "98765431", null);
    private final User userWithNotMatchPassword = new User("testuser@test.com", "testuser", "98765431", "987654391", null);


    @Test
    void shouldCreateUser() {
        //When
        when(userRepo.save(any(User.class))).thenReturn(expectedTestUser);
        User actual = userServiceImp.registerNewUser(newUser);

        //Then
        Assertions.assertEquals(expectedTestUser.getEmail(), actual.getEmail());

    }

    @Test
    void shouldNotCreateUser_UserExists() {

        //When
        when(userRepo.findById(newUser.getEmail())).thenReturn(Optional.of(newUser));

        //Then
        UserExistsException tho = assertThrows(UserExistsException.class, () -> userServiceImp.registerNewUser(newUser), "Throws Exception, if the User Exists");
        System.out.println(tho.getMessage());

        assertTrue(tho.getMessage().contains("User Exists. Please choose another E-Mail"));
    }

    @Test
    void shouldNotCreateUser_passwordNotMatch() {

        //When
        doThrow(PasswordNotMatchException.class)
                .when(userRepo)
                .save(userWithNotMatchPassword);
        //Then
        PasswordNotMatchException tho = assertThrows(PasswordNotMatchException.class, () -> userServiceImp.registerNewUser(userWithNotMatchPassword), "Throws Exception, Password not match");
        assertTrue(tho.getMessage().contains("Passwords do not match"));

    }
}
