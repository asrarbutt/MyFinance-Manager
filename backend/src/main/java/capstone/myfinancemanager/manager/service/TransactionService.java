package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.AddTransactionDto;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final RandomUUIDGenerator randomUUIDGenerator;

    public List<TransactionDto> getAllTransactions() {


        return transactionRepo.findAll()
                .stream()
                .map(t ->
                        new TransactionDto(
                                t.getUserEmail(),
                                t.getDescription(),
                                t.getAmount(),
                                t.getTransactionDate(),
                                t.getCategory(),
                                t.getIsIncome(),
                                t.getPictureId()))
                .toList();
    }

    public Transaction addTransaction(AddTransactionDto addNewTransactionDto) {

        Transaction transactionCreated = Transaction.builder()
                .id(randomUUIDGenerator.getRandomId())
                .userEmail(addNewTransactionDto.getUserEmail())
                .description(addNewTransactionDto.getDescription())
                .amount(addNewTransactionDto.getAmount())
                .transactionDate(Instant.ofEpochMilli(addNewTransactionDto.getTransactionDate()))
                .category(addNewTransactionDto.getCategory())
                .pictureId(addNewTransactionDto.getPictureId())
                .isIncome(addNewTransactionDto.getIsIncome())
                .build();

        return transactionRepo.save(transactionCreated);
    }
}
