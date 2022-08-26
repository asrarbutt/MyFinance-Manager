package capstone.myfinancemanager.manager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private String id;
    @NotNull
    private String description;
    @NotNull
    @PositiveOrZero
    private double amount;
    @NotNull
    private Instant transactionDate;
    @NotNull
    private String category;
    @NotNull
    private String userEmail;
    boolean isIncome;
    @NotNull
    private String pictureId;
}
