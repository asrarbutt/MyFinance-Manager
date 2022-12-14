package capstone.myfinancemanager.manager.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDto {
    private String id;
    private String userEmail;
    private String description;
    private double amount;
    private Instant transactionDate;
    private String category;
    private Boolean isIncome;
    private String pictureId;
}
