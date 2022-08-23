package capstone.myfinancemanager.manager.exceptions;

public class UserExistsException extends IllegalStateException {

    public UserExistsException(String s) {
        super(s);
    }
}
