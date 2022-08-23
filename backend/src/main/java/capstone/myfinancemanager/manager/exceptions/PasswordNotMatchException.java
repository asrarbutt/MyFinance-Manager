package capstone.myfinancemanager.manager.exceptions;

public class PasswordNotMatchException extends RuntimeException {
    public PasswordNotMatchException(String exceptionMessage) {


        super(exceptionMessage, null, false, false);
    }
}
