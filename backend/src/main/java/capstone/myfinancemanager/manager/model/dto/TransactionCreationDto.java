package capstone.myfinancemanager.manager.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "locations")
@Builder
public class TransactionCreationDto {

    @Email(message = "Email not valid")
    private String userEmail;

    @NotEmpty(message = "Name is required")
    private String description;

    @PositiveOrZero
    @DecimalMin(value = "0.0", message = "Please Enter a valid Amount")
    private double amount;

    @NotNull(message = "Date is required")
    private Long transactionDate;

    @NotEmpty(message = "Category is required")
    private String category;

    private String pictureId;

    private Boolean isIncome;

}
