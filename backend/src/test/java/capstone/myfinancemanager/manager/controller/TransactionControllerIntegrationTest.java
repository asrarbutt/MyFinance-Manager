package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionCreationDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Map;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.when;
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

    @MockBean
    private Cloudinary cloudinary;

    @MockBean
    private Uploader uploader;
    @Autowired
    private TransactionRepo transactionRepo;

    @MockBean
    private RandomUUIDGenerator randomUUIDGenerator;

    @MockBean
    private Timestamp timestampService;

    private final Instant testDate = Instant.parse("2022-08-23T09:22:41.255023Z");
    private final String randomTestId = "1";

    Transaction transaction1 = Transaction.builder()
            .id(randomTestId)
            .description("Essen")
            .amount(25.0)
            .transactionDate(testDate)
            .category("TestCategory")
            .userEmail("test@test.com")
            .isIncome(false)
            .pictureId("url").build();


    @BeforeEach
    public void clearDb() {
        transactionRepo.deleteAll();
    }

    protected RequestPostProcessor myTestUserWithEmail() {
        return user("asrar@gmail..com").password("Asrar1");
    }

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

    @Test
    @DirtiesContext
    void addTransactionWithoutFile() throws Exception {

        byte[] fileContent = "bar".getBytes(StandardCharsets.UTF_8);
        MockMultipartFile filePart = new MockMultipartFile("file", "orig", null, fileContent);
        byte[] json = """ 
                 {
                "userEmail": "a@a.com",
                "description": "5",
                "amount": 123.2,
                "transactionDate": "1661866382913",
                "category": "Essen",
                 "pictureId": "url",
                 "isIncome": true
                }
                """.getBytes(StandardCharsets.UTF_8);

        MockMultipartFile jsonPart = new MockMultipartFile("TransactionCreationDto", "TransactionCreationDto", "application/json", json);
        mockMvc.perform(multipart("/api/transactions")

                        .file(jsonPart)
                        .with(myTestUserWithEmail())
                        .with(csrf()))
                .andExpect(status().is(201));
    }

    @Test
    @DirtiesContext
    void addTransactionWithFile() throws Exception {

        byte[] fileContent = "bar".getBytes(StandardCharsets.UTF_8);
        MockMultipartFile firstFile = new MockMultipartFile(
                "file", "sawIcon.png",
                MediaType.TEXT_PLAIN_VALUE,
                "Hello, World!".getBytes());

        byte[] json = """ 
                 {
                "userEmail": "a@a.com",
                "description": "5",
                "amount": 123.2,
                "transactionDate": "1661866382913",
                "category": "Essen",
                 "pictureId": "url",
                 "isIncome": true
                }
                """.getBytes(StandardCharsets.UTF_8);

        MockMultipartFile jsonPart = new MockMultipartFile("TransactionCreationDto", "TransactionCreationDto", "application/json", json);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader
                .upload(any(File.class),
                        anyMap()
                )
        ).thenReturn(Map.of("url", "hallo", "public_id", "bla"));


        mockMvc.perform(multipart("/api/transactions")
                        .file(firstFile)
                        .file(jsonPart)
                        .with(myTestUserWithEmail())
                        .with(csrf()))
                .andExpect(status().is(201));
    }

    @DirtiesContext
    @Test
    @WithMockUser("test@test.com")
    void deleteTransaction() throws Exception {

        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        Transaction transactionResponse = transactionRepo.save(transaction1);
        String id = transactionResponse.getId();

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
    @WithMockUser("test@test.com")
    void updateTransactionTest() throws Exception {

        TransactionCreationDto transactionCreationDto = TransactionCreationDto.builder()
                .userEmail(transaction1.getUserEmail())
                .description("Heute ist sehr schön")
                .amount(159)
                .transactionDate(Long.parseLong("1661866382913"))
                .category("Tanken")
                .pictureId("url2")
                .isIncome(false)
                .build();

        Transaction transactionResponse = transactionRepo.save(transaction1);
        String id = transactionResponse.getId();

        String updatedResult = mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/transactions/" + id).with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionCreationDto))
                )
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();

        Transaction actualPlant = objectMapper.readValue(updatedResult, Transaction.class);
        Assertions.assertEquals(transaction1.getId(), actualPlant.getId());
    }

    @Test
    @DirtiesContext
    @WithMockUser("test@test.com")
    void updateTransactionDoNotExistTest() throws Exception {

        transactionRepo.save(transaction1);
        TransactionCreationDto transactionCreationDto = TransactionCreationDto.builder()
                .userEmail(transaction1.getUserEmail())
                .description("Heute ist sehr schön")
                .amount(159)
                .transactionDate(Long.parseLong("1661866382913"))
                .category("Tanken")
                .pictureId("url2")
                .isIncome(false)
                .build();

        mockMvc.perform(
                        MockMvcRequestBuilders.put("/api/transactions/" + "2").with(csrf())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionCreationDto))
                )
                .andExpect(status().is(404));
    }
}
