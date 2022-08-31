package capstone.myfinancemanager.manager.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class TransactionControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser("test@test.com")
    void getAllTransactions() throws Exception {

        mockMvc.perform(get("/auth/login")).andExpect(content().string("test@test.com"));

        mockMvc
                .perform(
                        MockMvcRequestBuilders.get("/transactions")
                )
                .andExpect(status().is(200))
                .andExpect(jsonPath("$", hasSize(0)));

    }

    protected RequestPostProcessor myTestUserWithEmail() {
        return user("a@a.com").password("123456");
    }

    @Test
    @DirtiesContext
    void addTransaction() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "userEmail": "a@a.com",
                                    "description": "5",
                                    "amount": 123.2,
                                    "transactionDate": "1661866382913",
                                    "category": "Essen",
                                    "pictureId": "url",
                                    "isIncome": true
                                }
                                """)
                        .with(myTestUserWithEmail()).with(csrf())
                ).andExpect(status().is(201))
                .andExpect(content().json("""
                         {
                                    "userEmail": "a@a.com",
                                    "description": "5",
                                    "amount": 123.2,
                                    "transactionDate": "+54632-06-13T14:48:33Z",
                                    "category": "Essen",
                                    "pictureId": "url",
                                    "isIncome": true
                                }
                        """));
    }

}