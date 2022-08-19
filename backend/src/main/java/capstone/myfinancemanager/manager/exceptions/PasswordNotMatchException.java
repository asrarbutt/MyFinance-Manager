package capstone.myfinancemanager.manager.exceptions;

public class PasswordNotMatchException extends IllegalStateException {
    public PasswordNotMatchException(String s) {
        super(s);
    }
}
