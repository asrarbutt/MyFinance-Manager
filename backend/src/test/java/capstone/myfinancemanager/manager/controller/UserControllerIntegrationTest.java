package capstone.myfinancemanager.manager.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.stream.Stream;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    private static Stream<Arguments> shouldNotRegisterUser_invalidEmail_emptyParameter() {
        return Stream.of(
                Arguments.of("", "must not be empty"),
                Arguments.of("test", "Email not valid")
        );
    }

    private static Stream<Arguments> shouldNotRegisterUser_passDoNotMatch_passShortThen6() {
        return Stream.of(

                Arguments.of("test-p", "Passwords do not match"),
                Arguments.of("test", "Password min length 6")
        );
    }

    @DirtiesContext
    @Test
    void shouldRegisterUser() throws Exception {

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "test-password",
                                         "repeatPassword": "test-password"
                                }
                                 """)
                )
                .andExpect(status().is(201))
                .andReturn();


        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("testname"));


    }


    @DirtiesContext
    @Test
    void shouldNotRegisterUser_UserExists() throws Exception {

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "test-password",
                                         "repeatPassword": "test-password"
                                }
                                 """)
                )
                .andExpect(status().is(201))
                .andReturn();


        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("testname"));


        MvcResult resultException = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "test-password",
                                         "repeatPassword": "test-password"
                                }
                                 """)
                )
                .andExpect(status().is(400)).andReturn();

        String exception = resultException.getResponse().getContentAsString();
        Assertions.assertTrue(exception.contains("User Exists. Please choose another E-Mail"));

    }


    @DirtiesContext
    @ParameterizedTest
    @MethodSource
    void shouldNotRegisterUser_passDoNotMatch_passShortThen6(String key, String value) throws Exception {

        MvcResult resultException = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "<ID>",
                                         "repeatPassword": "test-password"
                                }
                                 """.replaceFirst("<ID>", key))
                )
                .andExpect(status().is(400))
                .andReturn();

        String exception = resultException.getResponse().getContentAsString();


        Assertions.assertTrue(exception.contains(value));

    }
    @DirtiesContext
    @Test
    void shouldNotRegisterUser_passwordEmpty() throws Exception {

        MvcResult resultException = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "",
                                         "repeatPassword": ""
                                }
                                 """)
                )
                .andExpect(status().is(400))
                .andReturn();


        String exception = resultException.getResponse().getContentAsString();
        System.out.println(exception);
        Assertions.assertTrue(exception.contains("Password min length 6, must not be empty"));
    }


    @DirtiesContext
    @ParameterizedTest
    @MethodSource
    void shouldNotRegisterUser_invalidEmail_emptyParameter(String key, String value) throws Exception {

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "<ID>",
                                         "name": "testname",
                                         "password": "test-password",
                                         "repeatPassword": "test-password"
                                }
                                 """.replaceFirst("<ID>", key))
                )
                .andExpect(status().is(400))
                .andReturn();

        String exception = result.getResponse().getContentAsString();
        Assertions.assertTrue(exception.contains(value));

    }


}
