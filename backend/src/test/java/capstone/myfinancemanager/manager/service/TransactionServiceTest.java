package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class TransactionServiceTest {

    private final TransactionRepo transactionRepo = mock(TransactionRepo.class);

    private final Timestamp timestampService = mock(Timestamp.class);
    private final TransactionService transactionService = new TransactionService(transactionRepo);

    private final Instant testDate = Instant.parse("2022-08-23T09:22:41.255023Z");


    private final List<Transaction> testTransactions = List.of(
            new Transaction(UUID.randomUUID().toString(), "Essen", 25.0, testDate, "TestCategory", "testmail@test.com", false, "url"),
            new Transaction(UUID.randomUUID().toString(), "Tanken", 25.0, testDate, "TestCategory", "testmail@test.com", false, "url")
    );

    private final List<TransactionDto> testTransactionsDto = List.of(
            new TransactionDto("Essen", 25.0, testDate, "TestCategory", false, "url"),
            new TransactionDto("Tanken", 25.0, testDate, "TestCategory", false, "url")
    );

    @Test
    void getAllTransactions() {

        //when
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.findAll()).thenReturn(testTransactions);
        List<TransactionDto> actual = transactionService.getAllTransactions();

        //then
        Assertions.assertArrayEquals(testTransactionsDto.toArray(), actual.toArray());


    }


}