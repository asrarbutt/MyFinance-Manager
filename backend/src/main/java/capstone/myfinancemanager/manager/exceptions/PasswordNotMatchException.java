package capstone.myfinancemanager.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class PasswordNotMatchException extends RuntimeException {
    public PasswordNotMatchException(String exceptionMessage) {

        super(exceptionMessage, null, false, false);
    }
}
