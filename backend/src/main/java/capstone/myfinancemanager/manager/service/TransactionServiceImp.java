package capstone.myfinancemanager.manager.service;

import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.respository.TransactionRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TransactionServiceImp {

    private final TransactionRepo transactionRepo;

    public List<Transaction> getAllTransactions() {

        return transactionRepo.findAll();
    }
}
