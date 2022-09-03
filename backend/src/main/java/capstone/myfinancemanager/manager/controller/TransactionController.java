package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.exceptions.UserNotLoggedIn;
import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.User;
import capstone.myfinancemanager.manager.model.dto.TransactionCreationDto;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.service.TransactionService;
import capstone.myfinancemanager.manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@RequestBody TransactionCreationDto transactionCreation) {

        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByUsername(principal.getName()).orElseThrow(() -> new UserNotLoggedIn("Bitte vorher einloggen"));

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(buildNewTransactionDto(transactionService.addTransaction(transactionCreation, user.getEmail())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable String id) {
        boolean deleteSuccess = transactionService.deleteTransaction(id);
        return new ResponseEntity<>(deleteSuccess ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TransactionDto> updateTransaction(@PathVariable String id, @RequestBody TransactionCreationDto transactionUpdate) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(buildNewTransactionDto(transactionService.updateTransaction(id, transactionUpdate)));

    }

    public TransactionDto buildNewTransactionDto(Transaction transaction) {
        return TransactionDto.builder()
                .id(transaction.getId())
                .userEmail(transaction.getUserEmail())
                .description(transaction.getDescription())
                .amount(transaction.getAmount())
                .transactionDate(transaction.getTransactionDate())
                .category(transaction.getCategory())
                .isIncome(transaction.getIsIncome())
                .pictureId(transaction.getPictureId())
                .build();

    }


}
