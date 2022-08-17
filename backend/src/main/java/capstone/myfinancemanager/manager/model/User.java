package capstone.myfinancemanager.manager.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @NotNull(message = "Name is mandatory")
    String name;
    @Email(message = "Email is mandatory")
    @NotNull
    String email;
    @NotNull(message = "Password is mandatory")
    String password;
    @NotNull(message = "Password is mandatory")
    Instant userRegistrationTime;

}
