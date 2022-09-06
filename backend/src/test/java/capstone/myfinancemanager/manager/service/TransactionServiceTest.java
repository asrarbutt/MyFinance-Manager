package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.model.Timestamp;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionCreationDto;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


class TransactionServiceTest {
    private final TransactionRepo transactionRepo = mock(TransactionRepo.class);
    private final Timestamp timestampService = mock(Timestamp.class);
    private final RandomUUIDGenerator randomUUIDGenerator = mock(RandomUUIDGenerator.class);
    private final TransactionService transactionService = new TransactionService(transactionRepo, randomUUIDGenerator);
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
    Transaction transaction2 = Transaction.builder()
            .id(randomTestId)
            .description("Tanken")
            .amount(27.0)
            .transactionDate(testDate)
            .category("TestCategory")
            .userEmail("test@test.com")
            .isIncome(true)
            .pictureId("url").build();

    TransactionDto transactionDto1 = TransactionDto.builder()
            .id(randomTestId)
            .userEmail("test@test.com")
            .description("Tanken")
            .amount(27.0)
            .transactionDate(testDate)
            .category("TestCategory")
            .isIncome(true)
            .pictureId("url")
            .build();

    TransactionDto transactionDto2 = TransactionDto.builder()
            .id(randomTestId)
            .userEmail("test@test.com")
            .description("Essen")
            .amount(25.0)
            .transactionDate(testDate)
            .category("TestCategory")
            .isIncome(false)
            .pictureId("url")
            .build();

    TransactionCreationDto transactionCreationDto1 = TransactionCreationDto.builder()
            .description("Tanken")
            .amount(27.0)
            .transactionDate(Long.parseLong("1661866382913"))
            .category("TestCategory")
            .userEmail("test@test.com")
            .isIncome(true)
            .pictureId("url")
            .build();

    TransactionCreationDto transactionCreationDtoUpdate = TransactionCreationDto.builder()
            .userEmail("test@test.com")
            .description("Urlaub")
            .amount(27.0)
            .transactionDate(Long.parseLong("1661866382913"))
            .category("TestCategory2")
            .isIncome(true)
            .pictureId("url")
            .build();

    @Test
    void getAllTransactionsTest() {
        //when
        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.findAll()).thenReturn(List.of(transaction1, transaction2));
        List<TransactionDto> actual = transactionService.getAllTransactions(transactionDto1.getUserEmail());

        //then
        Assertions.assertEquals(actual.get(0).getUserEmail(), transaction2.getUserEmail());
    }

    @Test
    void addNewTransactionTest() {
        //when
        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.save(any())).thenReturn(transaction1);

        Transaction actual = transactionRepo.save(transaction1);
        Assertions.assertEquals(transaction1, actual);
    }


    @Test
    void deleteTransaction() {

        //when
        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.existsById(transactionDto1.getId())).thenReturn(true);

        doNothing().when(transactionRepo).deleteById(transactionDto1.getId());
        transactionService.deleteTransaction(transactionDto1.getId());

        verify(transactionRepo).deleteById(transactionDto1.getId());
    }

    @Test
    void deleteTransactionNotExistsTest() {

        //when
        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.existsById(transactionDto1.getId())).thenReturn(false);

        doNothing().when(transactionRepo).deleteById(transactionDto1.getId());

        transactionService.deleteTransaction(transactionDto1.getId());
        verify(transactionRepo, times(0)).deleteById(transactionDto1.getId());
    }

    @Test
    void updateTransactionTest() {

        //when
        when(randomUUIDGenerator.getRandomId()).thenReturn(randomTestId);
        when(timestampService.now()).thenReturn(Instant.parse("2022-08-23T09:22:41.255023Z"));
        when(transactionRepo.save(any())).thenReturn(transaction1);
        when(transactionRepo.findById(transaction1.getId())).thenReturn(Optional.ofNullable(transaction1));

        Transaction acutalTansaction = transactionService.updateTransaction(transaction1.getId(), transactionCreationDto1);


        verify(transactionRepo).save(transaction1);
        Assertions.assertEquals(transaction1.getId(), acutalTansaction.getId());
    }

}
