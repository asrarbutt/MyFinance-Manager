package capstone.myfinancemanager.manager.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @NotNull(message = "Name is mandatory")
    @NotEmpty
    private String name;

    @Email(message = "Email not valid")
    @NotNull
    @NotEmpty
    private String email;

    @NotNull(message = "Password is mandatory")
    @NotEmpty
    private String password;
    private String repeatPassword;

    @NotNull(message = "Date is mandatory")
    @NotEmpty
    private Instant userRegistrationTime;

}
