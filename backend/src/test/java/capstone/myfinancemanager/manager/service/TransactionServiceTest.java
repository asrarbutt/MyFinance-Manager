package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


class TransactionServiceTest {

    private final TransactionRepo transactionRepo = mock(TransactionRepo.class);

    private final Timestamp timestampService = mock(Timestamp.class);
    private final RandomUUIDGenerator randomUUIDGenerator = mock(RandomUUIDGenerator.class);
    private final TransactionService transactionService = new TransactionService(transactionRepo, randomUUIDGenerator);

    private final Instant testDate = Instant.parse("2022-08-23T09:22:41.255023Z");
    private final String randomTestId = "1";
    private final Transaction transaction =
            new Transaction(
                    randomTestId,
                    "Essen", 25.0,
                    testDate, "TestCategory",
                    "testmail@test.com",
                    false,
                    "url");

    private final TransactionDto transactionDto =
            new TransactionDto(
                    "Essen",
                    25.0,
                    testDate,
                    "TestCategory",
                    false,
                    "url");


    private final List<Transaction> testTransactions = List.of(
            new Transaction(randomTestId, "Essen", 25.0, testDate, "TestCategory", "testmail@test.com", false, "url"),
            new Transaction(randomTestId, "Tanken", 25.0, testDate, "TestCategory", "testmail@test.com", false, "url")
    );

    private final List<TransactionDto> testTransactionsDto = List.of(
            new TransactionDto("Essen", 25.0, testDate, "TestCategory", false, "url"),
            new TransactionDto("Tanken", 25.0, testDate, "TestCategory", false, "url")
    );

    @Test
    void getAllTransactionsTest() {

        //when
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.findAll()).thenReturn(testTransactions);
        List<TransactionDto> actual = transactionService.getAllTransactions();

        //then
        Assertions.assertArrayEquals(testTransactionsDto.toArray(), actual.toArray());
    }

    @Test
    void addNewTransactionTest() {

        //when
        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.save(any())).thenReturn(transaction);

        Transaction actual = transactionRepo.save(transaction);
        Assertions.assertEquals(transaction, actual);

    }


}