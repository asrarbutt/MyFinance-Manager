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
    String id;
    @NotNull
    String description;
    @NotNull
    @PositiveOrZero
    double amount;
    @NotNull
    Instant transactionDate;
    @NotNull
    String category;
    @NotNull
    String userEmail;
    boolean isIncome;
    @NotNull
    String pictureId;
}
