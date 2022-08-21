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

}