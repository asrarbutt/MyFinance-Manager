package capstone.myfinancemanager.manager.controller;

import capstone.myfinancemanager.manager.model.dto.TransactionDto;
import capstone.myfinancemanager.manager.service.TransactionServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/transaction")
public class TransactionController {

    private final TransactionServiceImp transactionServiceImp;

    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return transactionServiceImp.getAllTransactions();
    }

}
