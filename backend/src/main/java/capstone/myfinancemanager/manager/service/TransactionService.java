package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.model.RandomUUIDGenerator;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionCreationDto;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final RandomUUIDGenerator randomUUIDGenerator;

    public List<TransactionDto> getAllTransactions(String username) {

        return transactionRepo.findAll()
                .stream()
                .filter((transaction -> (transaction.getUserEmail().equals(username))))
                .map(t ->
                        new TransactionDto(
                                t.getId(),
                                t.getUserEmail(),
                                t.getDescription(),
                                t.getAmount(),
                                t.getTransactionDate(),
                                t.getCategory(),
                                t.getIsIncome(),
                                t.getPictureId()))
                .toList();
    }


    public Transaction addTransaction(
            TransactionCreationDto addNewTransactionDto,
            String userEmail, String url) {

        Transaction transactionCreated = Transaction.builder()
                .id(randomUUIDGenerator.getRandomId())
                .userEmail(userEmail)
                .description(addNewTransactionDto.getDescription())
                .amount(addNewTransactionDto.getAmount())
                .transactionDate(Instant.ofEpochMilli(addNewTransactionDto.getTransactionDate()))
                .category(addNewTransactionDto.getCategory())
                .pictureId(url)
                .isIncome(addNewTransactionDto.getIsIncome())
                .build();

        return transactionRepo.save(transactionCreated);
    }


    public boolean deleteTransaction(String id) {
        if (transactionRepo.existsById(id)) {
            transactionRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public Transaction updateTransaction(String id, TransactionCreationDto transactionUpdate) {

        Transaction transactionToUpdate = transactionRepo
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        transactionToUpdate.setDescription(transactionUpdate.getDescription());
        transactionToUpdate.setAmount(transactionUpdate.getAmount());
        transactionToUpdate.setTransactionDate(Instant.ofEpochMilli(transactionUpdate.getTransactionDate()));
        transactionToUpdate.setCategory(transactionUpdate.getCategory());
        transactionToUpdate.setIsIncome(transactionUpdate.getIsIncome());
        transactionToUpdate.setPictureId(transactionUpdate.getPictureId());

        return transactionRepo.save(transactionToUpdate);
    }
}
