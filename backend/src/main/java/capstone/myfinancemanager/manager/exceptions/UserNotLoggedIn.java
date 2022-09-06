package capstone.myfinancemanager.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UserNotLoggedIn extends RuntimeException {

    public UserNotLoggedIn(String exceptionMessage) {

        super(exceptionMessage, null, false, false);

    }
}
