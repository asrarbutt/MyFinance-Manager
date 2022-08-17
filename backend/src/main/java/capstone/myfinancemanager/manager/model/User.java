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
    String name;
    String email;
    String password;
    Instant userRegistrationTime;

}
