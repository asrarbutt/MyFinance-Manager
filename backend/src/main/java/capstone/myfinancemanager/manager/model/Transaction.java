package capstone.myfinancemanager.manager.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    String id;

    @NotNull
    @NotEmpty
    @Size(max = 100)
    String description;

    @NotNull
    @NotEmpty
    @PositiveOrZero
    Double amount;

    @PastOrPresent
    Instant transactionDate;

    @NotNull
    String category;

    String photoId;

    @NotNull
    String emailUser;

    @NotNull
    String periodEnum;

    @NotNull
    boolean isIncome;

}
