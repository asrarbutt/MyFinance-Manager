package capstone.myfinancemanager.manager.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppUserDto {

    @Id
    String username;
    String passwordHash;

}
