package capstone.myfinancemanager.manager.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    private String id;
    private String description;
    private double amount;
    private Instant transactionDate;
    private String category;
    private String userEmail;
    private Boolean isIncome;
    private String pictureId;
}
