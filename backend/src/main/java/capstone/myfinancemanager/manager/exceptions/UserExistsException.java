package capstone.myfinancemanager.manager.exceptions;

public class UserExistsException extends RuntimeException {

    public UserExistsException(String exceptionMessage) {

        super(exceptionMessage, null, false, false);

    }
}
