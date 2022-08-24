package capstone.myfinancemanager.manager.controller;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;


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
    @Test
    void shouldNotRegisterUser_passDoNotMatch() throws Exception {

        MvcResult resultException = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "test-p",
                                         "repeatPassword": "test-password"
                                }
                                 """)
                )
                .andExpect(status().is(400))
                .andReturn();

        String exception = resultException.getResponse().getContentAsString();


        Assertions.assertTrue(exception.contains("Passwords do not match"));

    }


    @DirtiesContext
    @Test
    void shouldNotRegisterUser_passShortThen6() throws Exception {

        MvcResult resultException = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "testemail@gmail.com",
                                         "name": "testname",
                                         "password": "test",
                                         "repeatPassword": "test"
                                }
                                 """)
                )
                .andExpect(status().is(400))
                .andReturn();

        String exception = resultException.getResponse().getContentAsString();

        Assertions.assertTrue(exception.contains("passwort min length 6"));
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
        Assertions.assertTrue(exception.contains("passwort min length 6, must not be empty"));
    }


    @DirtiesContext
    @Test
    void shouldNotRegisterUser_invalidEmail() throws Exception {

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "test",
                                         "name": "testname",
                                         "password": "test-password",
                                         "repeatPassword": "test-password"
                                }
                                 """)
                )
                .andExpect(status().is(400))
                .andReturn();

        String exception = result.getResponse().getContentAsString();
        Assertions.assertTrue(exception.contains("Email not valid"));

    }

    @DirtiesContext
    @Test
    void shouldNotRegisterUser_invalidEmail_empty() throws Exception {

        MvcResult result = mockMvc.perform(post("/auth/register")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                 {
                                     "email": "",
                                         "name": "testname",
                                         "password": "test-password",
                                         "repeatPassword": "test-password"
                                }
                                 """)
                )
                .andExpect(status().is(400))
                .andReturn();

        String exception = result.getResponse().getContentAsString();
        Assertions.assertTrue(exception.contains("must not be empty"));

    }
}
