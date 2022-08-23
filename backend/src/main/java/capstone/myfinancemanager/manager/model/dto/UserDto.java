package capstone.myfinancemanager.manager.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

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

    private String repeatPassword;

}
