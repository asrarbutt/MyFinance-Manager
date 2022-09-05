package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionCreationDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
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

import java.nio.charset.StandardCharsets;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class TransactionControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    @WithMockUser("test@test.com")
    void getAllTransactions() throws Exception {

        mockMvc.perform(get("/api/users/login")).andExpect(content().string("test@test.com"));

        mockMvc
                .perform(
                        MockMvcRequestBuilders.get("/api/transactions")
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

        mockMvc.perform(MockMvcRequestBuilders.post("/api/transactions")
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
                                    "transactionDate": "2022-08-30T13:33:02.913Z",
                                    "category": "Essen",
                                    "pictureId": "url",
                                    "isIncome": true
                                }
                        """));
    }


    @DirtiesContext
    @Test
    @WithMockUser("test@test.com")
    void deleteTransaction() throws Exception {

        String saveResult = mockMvc.perform(post(
                "/api/transactions").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                                    "description": "5",
                                    "amount": 123.2,
                                    "transactionDate": "1661866382913",
                                    "category": "Essen",
                                    "pictureId": "url",
                                    "isIncome": true
                                }
                        """)
        ).andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

        Transaction saveResultTransaction = objectMapper.readValue(saveResult, Transaction.class);
        String id = saveResultTransaction.getId();


        mockMvc.perform(delete("http://localhost:8080/api/transactions/" + id).with(csrf()))
                .andExpect(status().is(204));

        mockMvc.perform(get("http://localhost:8080/api/transactions").with(csrf()))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser("test@test.com")
    void deleteTransactionNotExists() throws Exception {

        String id = "555555";
        mockMvc.perform(delete("/api/transactions" + id).with(csrf()))
                .andExpect(status().is(404));
    }


    @Test
    @DirtiesContext
    void updateTransactionTest() throws Exception {
        String saveResult = mockMvc.perform(post(
                "/api/transactions").with(csrf())
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
        ).andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

        Transaction saveResultTransaction = objectMapper.readValue(saveResult, Transaction.class);
        String id = saveResultTransaction.getId();

        TransactionCreationDto transactionCreationDto = TransactionCreationDto.builder()
                .userEmail(saveResultTransaction.getUserEmail())
                .description("Heute ist sehr schön")
                .amount(159)
                .transactionDate(Long.parseLong("1661866382913"))
                .category("Tanken")
                .pictureId("url2")
                .isIncome(false)
                .build();

        String updatedResult = mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/transactions/update/" + saveResultTransaction.getId()).with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionCreationDto))
                )
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();

        Transaction actualPlant = objectMapper.readValue(updatedResult, Transaction.class);
        Assertions.assertEquals(saveResultTransaction.getId(), actualPlant.getId());
    }


    @Test
    @DirtiesContext
    void updateTransactionDoNotExistTest() throws Exception {
        String saveResult = mockMvc.perform(post(
                "/api/transactions").with(csrf())
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
        ).andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

        Transaction saveResultTransaction = objectMapper.readValue(saveResult, Transaction.class);
        String id = saveResultTransaction.getId();

        TransactionCreationDto transactionCreationDto = TransactionCreationDto.builder()
                .userEmail(saveResultTransaction.getUserEmail())
                .description("Heute ist sehr schön")
                .amount(159)
                .transactionDate(Long.parseLong("1661866382913"))
                .category("Tanken")
                .pictureId("url2")
                .isIncome(false)
                .build();

        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/transactions/update/" + "1").with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionCreationDto))
                )
                .andExpect(status().is(403));
    }


}