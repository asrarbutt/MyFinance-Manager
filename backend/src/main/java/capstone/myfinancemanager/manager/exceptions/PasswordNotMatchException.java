package capstone.myfinancemanager.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PasswordNotMatchException extends ResponseStatusException {
    public PasswordNotMatchException(HttpStatus status, String reason) {
        super(status, reason);
    }
}