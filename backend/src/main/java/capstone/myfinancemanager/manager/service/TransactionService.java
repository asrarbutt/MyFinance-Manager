package capstone.myfinancemanager.manager.service;


import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@RequiredArgsConstructor
@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;

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
}
