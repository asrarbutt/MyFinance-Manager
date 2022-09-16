package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.Transaction;
import capstone.myfinancemanager.manager.model.dto.TransactionCreationDto;
import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.service.PictureService;
import capstone.myfinancemanager.manager.service.TransactionService;
import capstone.myfinancemanager.manager.service.UserService;
import com.cloudinary.Cloudinary;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;
    private final Cloudinary cloudinary;
    private final PictureService pictureService;

    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return transactionService
                .getAllTransactions(principal.getName());
    }

    @ResponseStatus(code = HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@RequestPart(value = "TransactionCreationDto") TransactionCreationDto transactionCreation, @RequestPart(value = "file") Optional<MultipartFile> inputFile) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(buildNewTransactionDto(
                        transactionService
                                .addTransaction(
                                        transactionCreation,
                                        principal.getName(),
                                        pictureService.getFileUrl(inputFile)
                                )
                        )
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlant(@PathVariable String id) {
        boolean deleteSuccess = transactionService.deleteTransaction(id);
        return new ResponseEntity<>(deleteSuccess ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDto> updateTransaction(@PathVariable String id,
                                                            @RequestBody TransactionCreationDto transactionUpdate) {
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
