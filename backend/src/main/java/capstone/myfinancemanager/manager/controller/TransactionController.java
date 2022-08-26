package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
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


    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<TransactionDto> addTransaction(@RequestBody TransactionDto newTransactionDto) {

        transactionService.addTransaction(newTransactionDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(buildNewTransactionDto(
                        newTransactionDto.getDescription(),
                        newTransactionDto.getAmount(),
                        newTransactionDto.getTransactionDate(),
                        newTransactionDto.getCategory(),
                        newTransactionDto.isIncome(),
                        newTransactionDto.getPictureId()
                ));
    }

    public TransactionDto buildNewTransactionDto(
            String description,
            double amount,
            Instant transactionDate,
            String category,
            boolean isIncome,
            String pictureId) {
        return TransactionDto.builder()
                .description(description)
                .amount(amount)
                .transactionDate(transactionDate)
                .category(category)
                .isIncome(isIncome)
                .pictureId(pictureId)
                .build();

    }


}