package capstone.myfinancemanager.manager.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.*;
import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "locations")
@Builder
public class AddTransactionDto {

    @Email(message = "Email not valid")
    private String userEmail;

    @NotEmpty(message = "Name is required")
    private String description;

    @PositiveOrZero
    @DecimalMin(value = "0.0", message = "Please Enter a valid Amount")
    private double amount;

    @NotNull(message = "Date is required")
    private Instant transactionDate;

    @NotEmpty(message = "Category is required")
    private String category;

    private String pictureId;

    private Boolean isIncome;

}
