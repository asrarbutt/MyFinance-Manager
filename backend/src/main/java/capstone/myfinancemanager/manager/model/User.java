package capstone.myfinancemanager.manager.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Email(message = "Email not valid")
    @NotNull
    @NotEmpty
    private String email;

    @NotNull(message = "Name is mandatory")
    @NotEmpty
    private String name;

    @NotNull(message = "Password is mandatory")
    @NotEmpty
    @Size(min = 6, message = "passwort min length 6")
    private String password;

    @NotNull(message = "Date is mandatory")
    @NotEmpty
    private Instant userRegistrationDate;

    public User(String email) {
        this.email = email;
    }
}
