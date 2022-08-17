package capstone.myfinancemanager.manager.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @NotNull
    @NotEmpty
    private String cName;

    @NotNull
    @NotEmpty
    private String cIcon;

    @NotNull
    @NotEmpty
    private String color;
}

