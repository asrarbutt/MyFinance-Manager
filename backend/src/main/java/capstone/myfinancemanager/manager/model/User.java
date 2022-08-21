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
public class User {

    @Id

    private String email;
    private String name;
    private String password;
    private Instant userRegistrationDate;
    public User(String email) {
        this.email = email;
    }
}
