package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.AddTransactionDto;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return transactionService.getAllTransactions();
    }


    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@Valid @RequestBody AddTransactionDto newTransactionCreation) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(buildNewTransactionDto(transactionService.addTransaction(newTransactionCreation)));
    }

    public TransactionDto buildNewTransactionDto(Transaction transaction) {
        return TransactionDto.builder()
                .userEmail(transaction.getUserEmail())
                .description(transaction.getDescription())
                .amount(transaction.getAmount())
                .transactionDate(transaction.getTransactionDate())
                .category(transaction.getCategory())
                .isIncome(transaction.isIncome())
                .pictureId(transaction.getPictureId())
                .build();

    }


}