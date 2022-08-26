package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.model.Transaction;
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
                                t.getDescription(),
                                t.getAmount(),
                                t.getTransactionDate(),
                                t.getCategory(),
                                t.isIncome(),
                                t.getPictureId()))
                .toList();
    }

    public Transaction addTransaction(TransactionDto newTransactionDto) {

        Transaction newTransaction = new Transaction();
        newTransaction.setId(randomUUIDGenerator.getRandomId());
        newTransaction.setDescription(newTransactionDto.getDescription());
        newTransaction.setAmount(newTransactionDto.getAmount());
        newTransaction.setTransactionDate(Instant.now());
        newTransaction.setCategory(newTransactionDto.getCategory());
        newTransaction.setPictureId(newTransactionDto.getPictureId());
        newTransaction.setIncome(newTransactionDto.isIncome());
        newTransaction.setUserEmail("kommt aus dem login");

        return transactionRepo.save(newTransaction);
    }
}
