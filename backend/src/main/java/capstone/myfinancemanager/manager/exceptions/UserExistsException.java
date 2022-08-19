package capstone.myfinancemanager.manager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserExistsException extends ResponseStatusException {

    public UserExistsException(HttpStatus status, String reason) {
        super(status, reason);
    }
}
